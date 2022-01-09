import { loop } from './loop/loop';
import { nowPlaying } from './now-playing/nowPlaying';
import { pause } from './pause/pause';
import { play } from './play/play';
import { purge } from './purge/purge';
import { queue } from './queue/queue';
import { resume } from './resume/resume';
import { skip } from './skip/skip';
import { stop } from './stop/stop';
import { volume } from './volume/volume';

export const help = {
    name: 'help',
    description: 'List all available commands.',
    execute(interaction) {
        let content = '';
        const commands = [
            { name: play.name, description: play.description },
            { name: stop.name, description: stop.description },
            { name: loop.name, description: loop.description },
            { name: nowPlaying.name, description: nowPlaying.description },
            { name: pause.name, description: pause.description },
            { name: purge.name, description: purge.description },
            { name: queue.name, description: queue.description },
            { name: resume.name, description: resume.description },
            { name: skip.name, description: skip.description },
            { name: volume.name, description: volume.description },
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
