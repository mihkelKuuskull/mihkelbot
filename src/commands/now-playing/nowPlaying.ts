import { Player } from 'discord-player';
import { BaseCommandInteraction } from 'discord.js';
import { isUserInChannel } from '../validation';

export const nowPlaying = {
    name: 'nowplaying',
    description: 'Get the song that is currently playing.',
    async execute(interaction: BaseCommandInteraction, player: Player) {
        if (!isUserInChannel(interaction)) {
            return void interaction.reply({
                content: 'You are not in a voice channel!',
                ephemeral: true,
            });
        }

        await interaction.deferReply();

        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) {
            return void interaction.followUp({
                content: '❌ | No music is being played!',
            });
        }

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return void interaction.followUp({
            embeds: [
                {
                    title: 'Now Playing',
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: '\u200b',
                            value: progress,
                        },
                    ],
                    color: 0xffffff,
                },
            ],
        });
    },
};
