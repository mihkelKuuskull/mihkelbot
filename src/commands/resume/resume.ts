import { BaseCommandInteraction } from 'discord.js';
import { isUserInChannel } from '../validation';

export const resume = {
    name: 'resume',
    description: 'Resume current song!',
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
        const success = queue.setPaused(false);
        return void interaction.followUp({
            content: success ? '▶ | Resumed!' : '❌ | Something went wrong!',
        });
    },
};
