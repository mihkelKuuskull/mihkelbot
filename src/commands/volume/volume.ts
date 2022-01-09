import { BaseCommandInteraction } from 'discord.js';
import { isUserInChannel } from '../validation';

export const volume = {
    name: 'volume',
    description: 'Change the volume!',
    options: [
        {
            name: 'volume',
            type: 4, // 'INTEGER' Type
            description: 'Number between 0-200',
            required: true,
        },
    ],
    async execute(interaction: BaseCommandInteraction, player) {
        if (!isUserInChannel(interaction)) {
            return void interaction.reply({
                content: 'You are not in a voice channel!',
                ephemeral: true,
            });
        }

        await interaction.deferReply();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing)
            return void interaction.followUp({
                content: '❌ | No music is being played!',
            });

        let volume = Number(interaction.options.get('volume').value);
        volume = Math.max(0, volume);
        volume = Math.min(200, volume);
        const success = queue.setVolume(volume);

        return void interaction.followUp({
            content: success ? `🔊 | Volume set to ${volume}!` : '❌ | Something went wrong!',
        });
    },
};
