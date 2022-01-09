import { Player } from 'discord-player';
import { BaseCommandInteraction } from 'discord.js';
import { trimDiscordMessage } from '../../utils';
import { isUserInChannel } from '../validation';

export const shuffle = {
    name: 'shuffle',
    description: 'shuffle the queue!',
    async execute(interaction: BaseCommandInteraction, player: Player) {
        if (!isUserInChannel(interaction)) {
            return void interaction.reply({
                content: 'You are not in a voice channel!',
                ephemeral: true,
            });
        }

        await interaction.deferReply();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: '❌ | No music is being played!' });
        try {
            queue.shuffle();
            return void interaction.followUp({
                embeds: [
                    {
                        title: 'Now Playing',
                        description: trimDiscordMessage(
                            `The Current song playing is 🎶 | **${queue.current.title}**! \n 🎶 | ${queue}! `,
                        ),
                    },
                ],
            });
        } catch (error) {
            console.log(error);
            return void interaction.followUp({
                content: '❌ | Something went wrong!',
            });
        }
    },
};
