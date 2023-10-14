import { EmbedBuilder } from 'discord.js';
import { config } from '../../../config';

export const audioTracksAddEvent = {
    name: 'audioTracksAdd',
    event: (queue) => {
        if (!config.app.ExtraMessages) {
            return;
        }

        const audioTracksAdd = new EmbedBuilder()
            .setAuthor({ name: `All the songs in playlist added into the queue ✅` })
            .setColor('#2f3136');

        queue.metadata.send({ embeds: [audioTracksAdd] });
    },
};
