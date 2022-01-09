import { Player } from 'discord-player';
import { BaseCommandInteraction } from 'discord.js';
import { isUserInChannel } from '../validation';

export const stop = {
    name: 'stop',
    description: 'Stop all songs in the queue!',
    async execute(interaction: BaseCommandInteraction, player: Player) {
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
        queue.destroy();
        return void interaction.followUp({ content: '🛑 | Stopped the player!' });
    },
};
