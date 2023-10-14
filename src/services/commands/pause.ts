import { EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const pauseCommand = {
    name: 'pause',
    description: 'pause the track',

    execute: async ({ inter }) => {
        const queue = useQueue(inter.guild);

        if (!queue) {
            return inter.editReply({
                content: `No music currently playing ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }

        if (queue.node.isPaused()) {
            return inter.editReply({
                content: `The track is currently paused, ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }

        const success = queue.node.setPaused(true);

        const PauseEmbed = new EmbedBuilder()
            .setAuthor({
                name: success
                    ? `Current music ${queue.currentTrack.title} paused ✅`
                    : `Something went wrong ${inter.member}... try again ? ❌`,
            })
            .setColor('#2f3136');

        return inter.editReply({ embeds: [PauseEmbed] });
    },
};
