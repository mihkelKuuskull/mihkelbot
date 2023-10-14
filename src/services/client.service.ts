import { Client, GatewayIntentBits } from 'discord.js';
import { commands } from './commands.service';
import { config } from '../config';
import { discordEvents, playerEvents } from './event.service';
import { Player } from 'discord-player';

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ],
    allowedMentions: { parse: ['everyone'] },
});
const player = new Player(client, config.opt.discordPlayer);
player.extractors.loadDefault();

export function loadDiscordEvents() {
    discordEvents.forEach((event) => {
        client.on(event.name, event.event.bind(null, client));
    });
}

export function loadPlayerEvents() {
    playerEvents.forEach((event) => {
        player.events.on(event.name as any, event.event);
    });
}

client.on('ready', (client) => {
    if (config.app.global) {
        client.application.commands.set(commands);
    } else {
        console.log(client.guilds.cache);
        client.guilds.cache.get(config.app.guild).commands.set(commands);
    }
});
