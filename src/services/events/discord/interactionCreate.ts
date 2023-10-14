import { EmbedBuilder, InteractionType } from 'discord.js';
import { useQueue } from 'discord-player';
import { commands } from '../../commands.service';
import { buttons } from '../../button.service';

export const interactionCreateEvent = {
    name: 'interactionCreate',
    event: async (client, inter) => {
        await inter.deferReply();
        if (inter.type === InteractionType.ApplicationCommand) {
            const command = commands.find((command) => command.name === inter.commandName);

            if (!command) {
                return (
                    inter.editReply({
                        embeds: [
                            new EmbedBuilder().setColor('#ff0000').setDescription('❌ | Error! Command not found!'),
                        ],
                        ephemeral: true,
                    }),
                    client.slash.delete(inter.commandName)
                );
            }

            command.execute({ inter, client });
        }
        if (inter.type === InteractionType.MessageComponent) {
            const customId = JSON.parse(inter.customId);
            const buttonName = customId.ffb;
            if (buttonName) {
                const button = buttons.find((button) => button.name === buttonName);
                if (!button) {
                    return;
                }
                return button.command({ client, inter, customId, queue: useQueue(inter.guild) });
            }
        }
    },
};
