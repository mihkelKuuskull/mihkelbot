import { EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const backCommand = {
    name: 'back',
    description: 'Go back the song before',

    execute: async ({ inter }) => {
        const queue = useQueue(inter.guild);

        if (!queue?.node.isPlaying()) {
            return inter.editReply({
                content: `No music currently playing ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }

        if (!queue.history.previousTrack) {
            return inter.editReply({
                content: `There was no music played before ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }

        await queue.history.back();

        const BackEmbed = new EmbedBuilder().setAuthor({ name: `Playing the previous track ✅` }).setColor('#2f3136');

        inter.editReply({ embeds: [BackEmbed] });
    },
};
