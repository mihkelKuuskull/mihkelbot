import { EmbedBuilder } from 'discord.js';
import { config } from '../../../config';

export const audioTrackAddEvent = {
    name: 'audioTrackAdd',
    event: (queue, track) => {
        if (!config.app.ExtraMessages) {
            return;
        }

        const audioTrackAdd = new EmbedBuilder()
            .setAuthor({ name: `Track ${track.title} added in the queue ✅`, iconURL: track.thumbnail })
            .setColor('#2f3136');

        queue.metadata.send({ embeds: [audioTrackAdd] });
    },
};
