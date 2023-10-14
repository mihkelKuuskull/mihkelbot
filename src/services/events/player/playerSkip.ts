import { EmbedBuilder } from 'discord.js';

export const playerSkipEvent = {
    name: 'playerSkip',
    event: (queue, track) => {
        const playerSkip = new EmbedBuilder()
            .setAuthor({ name: `Skipping **${track.title}** due to an issue! ❌`, iconURL: track.thumbnail })
            .setColor('#EE4B2B');

        queue.metadata.send({ embeds: [playerSkip] });
    },
};
