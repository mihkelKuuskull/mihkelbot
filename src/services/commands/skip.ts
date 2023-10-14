import { EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const skipCommand = {
    name: 'skip',
    description: 'skip the track',
    execute: async ({ inter }) => {
        const queue = useQueue(inter.guild);

        if (!queue?.isPlaying()) {
            return inter.editReply({
                content: `No music currently playing ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }

        const success = queue.node.skip();

        const SkipEmbed = new EmbedBuilder().setColor('#2f3136').setAuthor({
            name: success
                ? `Current music ${queue.currentTrack.title} skipped ✅`
                : `Something went wrong ${inter.member}... try again ? ❌`,
        });

        return inter.editReply({ embeds: [SkipEmbed] });
    },
};
