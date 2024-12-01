import { EmbedBuilder } from 'discord.js';

export const disconnectEvent = {
    name: 'disconnect',
    event: (queue) => {
        const Disconnect = new EmbedBuilder()
            .setAuthor({ name: `Disconnected from the voice channel, clearing the queue! ❌` })
            .setColor('#2f3136');

        queue.metadata.channel.send({ embeds: [Disconnect] });
    },
};
