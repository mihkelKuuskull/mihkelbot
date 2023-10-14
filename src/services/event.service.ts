import { interactionCreateEvent } from './events/discord/interactionCreate';
import { readyEvent } from './events/discord/ready';
import { audioTrackAddEvent } from './events/player/audioTrackAdd';
import { audioTracksAddEvent } from './events/player/audioTracksAdd';
import { disconnectEvent } from './events/player/disconnect';
import { emptyChannelEvent } from './events/player/emptyChannel';
import { emptyQueueEvent } from './events/player/emptyQueue';
import { errorEvent } from './events/player/error';
import { playerErrorEvent } from './events/player/playerError';
import { playerSkipEvent } from './events/player/playerSkip';
import { playerStartEvent } from './events/player/playerStart';

export const discordEvents = [interactionCreateEvent, readyEvent];
export const playerEvents = [
    audioTrackAddEvent,
    audioTracksAddEvent,
    disconnectEvent,
    emptyChannelEvent,
    emptyQueueEvent,
    errorEvent,
    playerErrorEvent,
    playerSkipEvent,
    playerStartEvent,
];
