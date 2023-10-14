import { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } from 'discord.js';

export const controllerCommand = {
    name: 'controller',
    description: 'set controller channel ',
    options: [
        {
            name: 'channel',
            description: 'the channel you want to send it to',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
    ],
    execute: async ({ inter }) => {
        const channel = inter.options.getChannel('channel');
        if (channel.type !== 0) {
            return inter.editReply({ content: `you have to send it to a text channel.. ❌`, ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle('control your music from the buttons below')
            .setImage(inter.guild.iconURL({ size: 4096, dynamic: true }))
            .setColor('#2f3136')
            .setFooter({
                text: 'Sick beats by Challenger coach ❤️',
                iconURL: inter.member.avatarURL({ dynamic: true }),
            });

        inter.editReply({ content: `sending controller to ${channel}... ✅`, ephemeral: true });

        const back = new ButtonBuilder()
            .setLabel('Back')
            .setCustomId(JSON.stringify({ ffb: 'back' }))
            .setStyle(ButtonStyle.Primary);

        const skip = new ButtonBuilder()
            .setLabel('Skip')
            .setCustomId(JSON.stringify({ ffb: 'skip' }))
            .setStyle(ButtonStyle.Primary);

        const resumepause = new ButtonBuilder()
            .setLabel('Resume & Pause')
            .setCustomId(JSON.stringify({ ffb: 'resume&pause' }))
            .setStyle(ButtonStyle.Danger);

        const save = new ButtonBuilder()
            .setLabel('Save')
            .setCustomId(JSON.stringify({ ffb: 'savetrack' }))
            .setStyle(ButtonStyle.Success);

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

        const np = new ButtonBuilder()
            .setLabel('Now Playing')
            .setCustomId(JSON.stringify({ ffb: 'nowplaying' }))
            .setStyle(ButtonStyle.Secondary);

        const queuebutton = new ButtonBuilder()
            .setLabel('Queue')
            .setCustomId(JSON.stringify({ ffb: 'queue' }))
            .setStyle(ButtonStyle.Secondary);

        const lyrics = new ButtonBuilder()
            .setLabel('lyrics')
            .setCustomId(JSON.stringify({ ffb: 'lyrics' }))
            .setStyle(ButtonStyle.Primary);

        const shuffle = new ButtonBuilder()
            .setLabel('shuffle')
            .setCustomId(JSON.stringify({ ffb: 'shuffle' }))
            .setStyle(ButtonStyle.Success);

        const stop = new ButtonBuilder()
            .setLabel('Stop')
            .setCustomId(JSON.stringify({ ffb: 'stop' }))
            .setStyle(ButtonStyle.Danger);

        const row1 = new ActionRowBuilder().addComponents(back, queuebutton, resumepause, np, skip);
        const row2 = new ActionRowBuilder().addComponents(volumedown, loop, save, volumeup);
        const row3 = new ActionRowBuilder().addComponents(lyrics, shuffle, stop);

        channel.send({ embeds: [embed], components: [row1, row2, row3] });
    },
};
