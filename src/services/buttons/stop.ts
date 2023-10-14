import { EmbedBuilder } from 'discord.js';

export const stopButton = {
    name: 'stop',
    command: async ({ inter, queue }) => {
        if (!queue?.isPlaying()) {
            return inter.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });
        }

        queue.delete();

        const StopEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: `Music stopped into this server, see you next time ✅` });

        return inter.editReply({ embeds: [StopEmbed], ephemeral: true });
    },
};
