import { UNMUTEVOLUME, MUTEVOLUME, TOGGLEVOLUME, SETVOLUME, INCREMENTSONG, DECREMENTSONG, SETSONG, SETRANDOMSONG } from '../actions/music';

const initState = {
    currentSong: 0,
    isMuted: false,
    volume: .5
}

const NUM_SONGS = 3;

export const musicReducer = (state = initState, action) => {
    const music = { ...state };
    switch (action.type) {
        case MUTEVOLUME:
            music.isMuted = true;
            return music;
        case UNMUTEVOLUME:
            music.isMuted = false;
            return music;
        case TOGGLEVOLUME:
            music.isMuted = !music.isMuted;
            return music;
        case SETVOLUME:
            music.volume = action.payload.volume;
            return music;
        case INCREMENTSONG:
            music.currentSong += 1;
            music.currentSong %= NUM_SONGS;
            return music;
        case SETSONG:
            const song = action.payload.song;
            if (song >= 0 && song < NUM_SONGS) {
                music.currentSong = song;
                return music;
            }
            return state;
        case DECREMENTSONG:
            music.currentSong -= 1;
            if (music.currentSong < 0)
                music.currentSong = NUM_SONGS - 1;
            return music;
        case SETRANDOMSONG:
            let numSongs = 6;
            let current =  music.currentSong;
            let r = Math.floor(Math.random()*(numSongs - 2)+1);
            music.currentSong = (current + r) % numSongs;
           return music;
        default:
            return state;
    }
}

