import { GuildMember, BaseCommandInteraction } from 'discord.js';

export function isUserInChannel(interaction: BaseCommandInteraction) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        return false;
    }

    if (
        interaction.guild.me.voice.channelId &&
        interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
        return false;
    }
    return true;
}
