import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { config } from '../../../config';

export const playerStartEvent = {
    name: 'playerStart',
    event: (queue, track) => {
        if (!config.app.loopMessage && queue.repeatMode !== 0) {
            return;
        }
        const embed = new EmbedBuilder()
            .setAuthor({ name: `Started playing ${track.title} in ${queue.channel.name} 🎧`, iconURL: track.thumbnail })
            .setColor('#2f3136');

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

        const loop = new ButtonBuilder()
            .setLabel('Loop')
            .setCustomId(JSON.stringify({ ffb: 'loop' }))
            .setStyle(ButtonStyle.Secondary);

        const lyrics = new ButtonBuilder()
            .setLabel('lyrics')
            .setCustomId(JSON.stringify({ ffb: 'lyrics' }))
            .setStyle(ButtonStyle.Secondary);

        const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, lyrics, skip);
        queue.metadata.channel.send({ embeds: [embed], components: [row1] });
    },
};
