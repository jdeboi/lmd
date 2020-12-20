import { RESIZEAPP } from '../actions';

let initW = typeof window === 'object' ? window.innerWidth : null;
let initH = typeof window === 'object' ? window.innerHeight : null;

const initialState = {
    width: initW,
    height: initH,
    isMobile: getIsMobile(),
    orientation: getOrientation(initW, initH),
    size: getWindowSize(initW)
};

function getOrientation(w, h) {
    return w > h ? "landscape" : "portrait";
}

function getIsMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

function getWindowSize(w) {
    if (!w)
        return 'medium';
    else if (w < 480)
        return 'xsmall';
    else if (w < 768)
        return 'small';
    else if (w < 992)
        return 'medium';
    else if (w < 1200)
        return 'large';
    return 'xlarge';
}

export const windowReducer = (state = initialState, action) => {

    const window = { ...state };
    switch (action.type) {
        
        case RESIZEAPP:
            window.width = action.payload.width;
            window.height = action.payload.height;
            window.orientation = getOrientation(window.width, window.height);
            window.isMobile = getIsMobile();
            window.size = getWindowSize(window.width);
            return window;
        default:
            return state;

    }
}