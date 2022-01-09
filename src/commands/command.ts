import { help } from './help';
import { loop } from './loop/loop';
import { nowPlaying } from './now-playing/nowPlaying';
import { pause } from './pause/pause';
import { playTop } from './play-top/playTop';
import { play } from './play/play';
import { purge } from './purge/purge';
import { queue } from './queue/queue';
import { remove } from './remove/remove';
import { resume } from './resume/resume';
import { shuffle } from './shuffle/shuffle';
import { skip } from './skip/skip';
import { stop } from './stop/stop';
import { volume } from './volume/volume';

export const commands = [
    loop,
    nowPlaying,
    pause,
    play,
    playTop,
    purge,
    queue,
    remove,
    resume,
    shuffle,
    skip,
    stop,
    volume,
    help,
];
