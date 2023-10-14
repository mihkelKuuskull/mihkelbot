import { EmbedBuilder } from 'discord.js';

export const playerErrorEvent = {
    name: 'playerError',
    event: (queue, error) => {
        const ErrorEmbed = new EmbedBuilder()
            .setAuthor({
                name: `Bot had an unexpected error, please check the console imminently!`,
                iconURL: error.thumbnail,
            })
            .setColor('#EE4B2B');

        queue.metadata.send({ embeds: [ErrorEmbed] });

        console.log(`Error emitted from the PLayer ${error.message}`);
    },
};
