import { EmbedBuilder } from 'discord.js';

export const emptyChannelEvent = {
    name: 'emptyChannel',
    event: (queue) => {
        const emptyChannel = new EmbedBuilder()
            .setAuthor({ name: `Nobody is in the voice channel, leaving the voice channel!  ❌` })
            .setColor('#2f3136');

        queue.metadata.channel.send({ embeds: [emptyChannel] });
    },
};
