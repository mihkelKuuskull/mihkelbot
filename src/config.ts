import { config as envConfig } from 'dotenv';

envConfig({ path: '.env' });

export const config = {
    app: {
        token: process.env.TOKEN,
        playing: 'sick tunes ❤️',
        global: true,
        guild: process.env.GUILD,
        ExtraMessages: false,
        loopMessage: false,
    },

    opt: {
        maxVol: 100,
        spotifyBridge: true,
        volume: 20,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 30000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 30000,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25,
            },
        },
    },
};
