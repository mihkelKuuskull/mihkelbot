import { EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const shuffleCommand = {
    name: 'shuffle',
    description: 'shuffle the track',

    execute: async ({ inter }) => {
        const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) {
            return inter.editReply({
                content: `No music currently playing ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }

        if (!queue.tracks.toArray()[0]) {
            return inter.editReply({
                content: `No music in the queue after the current one ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }

        await queue.tracks.shuffle();

        const ShuffleEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: `Queue shuffled ${queue.tracks.size} song(s)! ✅` });

        return inter.editReply({ embeds: [ShuffleEmbed] });
    },
};
