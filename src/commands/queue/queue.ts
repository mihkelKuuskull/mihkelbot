import { GuildMember } from 'discord.js';

export const queue = {
    name: 'queue',
    description: 'View the queue of current songs!',

    async execute(interaction, player) {
        if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return void interaction.reply({
                content: 'You are not in a voice channel!',
                ephemeral: true,
            });
        }

        if (
            interaction.guild.me.voice.channelId &&
            interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
        ) {
            return void interaction.reply({
                content: 'You are not in my voice channel!',
                ephemeral: true,
            });
        }
        const queue = player.getQueue(interaction.guildId);
        if (typeof queue != 'undefined') {
            return void interaction.reply({
                embeds: [
                    {
                        title: 'Now Playing',
                        description: trimString(
                            `The Current song playing is 🎶 | **${queue.current.title}**! \n 🎶 | **${queue}**! `,
                            4095,
                        ),
                    },
                ],
            });
        } else {
            return void interaction.reply({
                content: 'There is no song in the queue!',
            });
        }
    },
};

function trimString(text: string, maxLength: number) {
    if (text.length <= maxLength) {
        return text;
    }
    return `${text.slice(0, maxLength - 3)}...`;
}
