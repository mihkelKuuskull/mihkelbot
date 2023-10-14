import { EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const stopCommand = {
    name: 'stop',
    description: 'stop the track',

    execute: async ({ inter }) => {
        const queue = useQueue(inter.guild);

        if (!queue?.isPlaying()) {
            return inter.editReply({
                content: `No music currently playing ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }

        queue.delete();

        const StopEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: `Music stopped into this server, see you next time ✅` });

        return inter.editReply({ embeds: [StopEmbed] });
    },
};
