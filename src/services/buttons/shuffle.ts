import { EmbedBuilder } from 'discord.js';

export const shuffleButton = {
    name: 'shuffle',
    command: async ({ inter, queue }) => {
        if (!queue?.isPlaying()) {
            return inter.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });
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

        return inter.editReply({ embeds: [ShuffleEmbed], ephemeral: true });
    },
};
