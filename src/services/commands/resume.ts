import { EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const resumeCommand = {
    name: 'resume',
    description: 'play the track',

    execute: async ({ inter }) => {
        const queue = useQueue(inter.guild);

        if (!queue) {
            return inter.editReply({
                content: `No music currently playing ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }

        if (queue.node.isPlaying()) {
            return inter.editReply({
                content: `The track is already running, ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }

        const success = queue.node.resume();

        const ResumeEmbed = new EmbedBuilder()
            .setAuthor({
                name: success
                    ? `Current music ${queue.currentTrack.title} resumed ✅`
                    : `Something went wrong ${inter.member}... try again ? ❌`,
            })
            .setColor('#2f3136');

        return inter.editReply({ embeds: [ResumeEmbed] });
    },
};
