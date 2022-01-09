import { Player } from 'discord-player';
import { BaseCommandInteraction } from 'discord.js';
import { isUserInChannel } from '../validation';

export const remove = {
    name: 'remove',
    description: 'remove a song from the queue!',
    options: [
        {
            name: 'number',
            type: 4, // 'INTEGER' Type
            description: 'The queue number you want to remove',
            required: true,
        },
    ],
    async execute(interaction: BaseCommandInteraction, player: Player) {
        if (!isUserInChannel(interaction)) {
            return void interaction.reply({
                content: 'You are not in a voice channel!',
                ephemeral: true,
            });
        }

        await interaction.deferReply();
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.followUp({ content: '❌ | No music is being played!' });
        const number = Number(interaction.options.get('number').value) - 1;
        if (number > queue.tracks.length)
            return void interaction.followUp({ content: '❌ | Track number greater than queue depth!' });
        const removedTrack = queue.remove(number);
        return void interaction.followUp({
            content: removedTrack ? `✅ | Removed **${removedTrack}**!` : '❌ | Something went wrong!',
        });
    },
};
