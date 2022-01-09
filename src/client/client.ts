import { BaseCommandInteraction } from 'discord.js';
import { DiscordClient } from './client.class';
import { initMusicPlayer } from './music-player/musicPlayer';

const config = {
    token: 'OTI5NzIyMDY5MzA0ODg1MjY5.YdrdJg.My-cqtm2nY6Ed02kELRDlfTjF4c',
    activity: 'Vanilla Ninja',
};

export const client = new DiscordClient();

const musicPlayer = initMusicPlayer(client);

client.once('ready', async () => {
    console.log('Ready to go!');
});

client.on('ready', function () {
    client.user.setActivity(config.activity, { type: 'PLAYING' });
});

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) {
        return;
    }
    if (!client.application?.owner) {
        await client.application?.fetch();
    }
    if (message.content === '!deploy' && message.author.id === client.application?.owner?.id) {
        await message.guild.commands
            .set(client.commands)
            .then(() => {
                message.reply('Deployed!');
            })
            .catch((err) => {
                message.reply('Could not deploy commands! Make sure the bot has the application.commands permission!');
                console.error(err);
            });
    }
});

client.on('interactionCreate', async (interaction: BaseCommandInteraction) => {
    const command = client.commands.get(interaction.commandName.toLowerCase());

    try {
        command.execute(interaction, musicPlayer);
    } catch (error) {
        console.error(error);
        interaction.followUp({
            content: 'There was an error trying to execute that command!',
        });
    }
});
