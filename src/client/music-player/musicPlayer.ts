import { Player, Queue } from 'discord-player';
import { DiscordClient } from '../client.class';

export function initMusicPlayer(client: DiscordClient) {
    const musicPlayer = new Player(client);

    musicPlayer.on('error', (queue, error) => {
        console.log(error);
    });

    musicPlayer.on('connectionError', (queue, error) => {
        console.log(error);
    });

    musicPlayer.on('trackStart', (queue: MusicPlayerQueue, track) => {
        queue.metadata.send(`▶ | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
    });

    musicPlayer.on('trackAdd', (queue: MusicPlayerQueue, track) => {
        queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
    });

    musicPlayer.on('botDisconnect', (queue: MusicPlayerQueue) => {
        queue.metadata.send('❌ | I was manually disconnected from the voice channel, clearing queue!');
    });

    musicPlayer.on('channelEmpty', (queue: MusicPlayerQueue) => {
        queue.metadata.send('❌ | Nobody is in the voice channel, leaving...');
    });

    musicPlayer.on('queueEnd', (queue: MusicPlayerQueue) => {
        queue.metadata.send('✅ | Queue finished!');
    });
    return musicPlayer;
}

type MusicPlayerQueue = Queue<{ send: (message: string) => void }>;
