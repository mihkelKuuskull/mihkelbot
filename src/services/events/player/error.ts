import { EmbedBuilder } from 'discord.js';

export const errorEvent = {
    name: 'error',
    event: (queue, error) => {
        const ErrorEmbed = new EmbedBuilder()
            .setAuthor({
                name: `Bot had an unexpected error, please check the console imminently!`,
            })
            .setColor('#EE4B2B');

        queue.metadata.send({ embeds: [ErrorEmbed] });

        console.log(`Error emitted from the Bot ${error.message}`);
    },
};
