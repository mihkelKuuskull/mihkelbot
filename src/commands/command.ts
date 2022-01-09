import { help } from './help';
import { loop } from './loop/loop';
import { nowPlaying } from './now-playing/nowPlaying';
import { pause } from './pause/pause';
import { play } from './play/play';
import { purge } from './purge/purge';
import { queue } from './queue/queue';
import { resume } from './resume/resume';
import { skip } from './skip/skip';
import { stop } from './stop/stop';
import { volume } from './volume/volume';

export const commands = [loop, nowPlaying, pause, play, purge, queue, resume, skip, stop, volume, help];
