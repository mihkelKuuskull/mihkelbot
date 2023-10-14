import * as Genius from 'genius-lyrics';

export const lyricsClient = new Genius.Client();

export function getLyrics(trackTitle: string) {
    return lyricsClient.songs.search(trackTitle);
}
