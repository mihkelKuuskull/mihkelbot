import { play } from './play/play';
import { stop } from './stop/stop';

export const help = {
    name: 'help',
    description: 'List all available commands.',
    execute(interaction) {
        let content = '';
        const commands = [
            { name: play.name, description: play.description },
            { name: stop.name, description: stop.description },
        ];

        for (const command of commands) {
            content += `Name: ${command.name}, Description: ${command.description} \n`;
        }

        return void interaction.reply({
            content,
            ephemeral: true,
        });
    },
};
