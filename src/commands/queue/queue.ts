import { Player } from 'discord-player';
import { BaseCommandInteraction } from 'discord.js';
import { trimDiscordMessage } from '../../utils';
import { isUserInChannel } from '../validation';

export const queue = {
    name: 'queue',
    description: 'View the queue of current songs!',

    async execute(interaction: BaseCommandInteraction, player: Player) {
        if (!isUserInChannel(interaction)) {
            return void interaction.reply({
                content: 'You are not in a voice channel!',
                ephemeral: true,
            });
        }

        const queue = player.getQueue(interaction.guildId);
        if (typeof queue != 'undefined') {
            return void interaction.reply({
                embeds: [
                    {
                        title: 'Now Playing',
                        description: trimDiscordMessage(
                            `The Current song playing is 🎶 | **${queue.current.title}**! \n 🎶 | **${queue}**! `,
                        ),
                    },
                ],
            });
        } else {
            return void interaction.reply({
                content: 'There is no song in the queue!',
            });
        }
    },
};
