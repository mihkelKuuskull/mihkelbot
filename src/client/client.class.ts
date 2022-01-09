import { Client, Collection, Intents } from 'discord.js';
import { commands } from '../commands/command';

export class DiscordClient extends Client {
    commands: any;
    constructor() {
        super({
            intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
        });
        this.commands = new Collection();
        commands.forEach((command) => {
            this.commands.set(command.name, command);
        });
    }
}
