import { INCREMENTSONG, DECREMENTSONG, SETSONG } from '../actions/music';

const NUM_SONGS = 3;

export const musicReducer = (state = 0, action) => {
    let s = 0;
    switch (action.type) {
        case INCREMENTSONG:
            s = state + 1;
            s %= NUM_SONGS;
            return s;
        case SETSONG:
            const song = action.payload.song;
            if (song >= 0 && song < NUM_SONGS)
                return song;
            return state;
        case DECREMENTSONG:
            s = state - 1;
            if (s < 0)
                s = NUM_SONGS - 1;
            return s;
        default:
            return state;
    }
}

