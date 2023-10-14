import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { useQueue } from 'discord-player';

export const nowPlayingCommand = {
    name: 'nowplaying',
    description: 'view what is playing!',

    execute: async ({ client, inter }) => {
        const queue = useQueue(inter.guild);

        if (!queue) {
            return inter.editReply({
                content: `No music currently playing ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }

        const track = queue.currentTrack;

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = track.duration;

        const trackDuration = timestamp === 'Infinity' ? 'infinity (live)' : track.duration;

        const progress = queue.node.createProgressBar();

        const embed = new EmbedBuilder()
            .setAuthor({ name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setThumbnail(track.thumbnail)
            .setDescription(
                `Volume **${queue.node.volume}**%\nDuration **${trackDuration}**\nProgress ${progress}\nLoop mode **${
                    methods[queue.repeatMode]
                }**\nRequested by ${track.requestedBy}`,
            )
            .setFooter({
                text: 'Sick beats by Challenger coach ❤️',
                iconURL: inter.member.avatarURL({ dynamic: true }),
            })
            .setColor('#2f3136')
            .setTimestamp();

        const saveButton = new ButtonBuilder()
            .setLabel('Save this track')
            .setCustomId(JSON.stringify({ ffb: 'savetrack' }))
            .setStyle(ButtonStyle.Danger);

        const volumeup = new ButtonBuilder()
            .setLabel('Volume up')
            .setCustomId(JSON.stringify({ ffb: 'volumeup' }))
            .setStyle(ButtonStyle.Primary);

        const volumedown = new ButtonBuilder()
            .setLabel('Volume Down')
            .setCustomId(JSON.stringify({ ffb: 'volumedown' }))
            .setStyle(ButtonStyle.Primary);

        const loop = new ButtonBuilder()
            .setLabel('Loop')
            .setCustomId(JSON.stringify({ ffb: 'loop' }))
            .setStyle(ButtonStyle.Danger);

        const resumepause = new ButtonBuilder()
            .setLabel('Resume & Pause')
            .setCustomId(JSON.stringify({ ffb: 'resume&pause' }))
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(volumedown, saveButton, resumepause, loop, volumeup);

        inter.editReply({ embeds: [embed], components: [row] });
    },
};
