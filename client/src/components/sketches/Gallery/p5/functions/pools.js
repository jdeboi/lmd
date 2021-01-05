
import { globalConfig } from "../../constants";
import { pools, limits } from '../../constants';

export function drawPools(poolImg, p5) {
    let sc = globalConfig.scaler;
    const w = 5 * sc;
    const h = 5 * sc;
    for (let i = 0; i < 3; i++) {
        const x = pools[i].x * sc;
        const y = pools[i].y * sc;
        p5.image(poolImg, x, y, w, h)
    }
}


export function drawGrassPatch(grass0, grass1, p5) {
    let sc = globalConfig.scaler;
    const w = 5 * sc;
    const h = 5 * sc;
    for (let i = 0; i < 3; i++) {
        const x = pools[i].x * sc;
        const y1 = (pools[i].y + 5) * sc;
        const y = pools[i].y * sc;
        p5.image(grass1, x, y, w, h)
        p5.image(grass0, x, y1, w, h)
    }

    const xx = pools[2].x * sc + sc * 5;
    const yy = (pools[2].y + 5) * sc;
    p5.image(grass1, xx, yy, w, h)
}

export function drawShrubPatch(shrub, p5) {
    let sc = globalConfig.scaler;
    const w = 5 * sc;
    const h = 5 * sc;


    var xx = (limits[0].x) * sc;
    var yy = (limits[2].y - 5) * sc;
    p5.image(shrub, xx, yy, w, h)

    xx = (limits[0].x) * sc;
    yy = (limits[2].y - 10) * sc;
    p5.image(shrub, xx, yy, w, h)

    xx = (limits[0].x + 5) * sc;
    yy = (limits[2].y - 5) * sc;
    p5.image(shrub, xx, yy, w, h)
}

export function poolBoundaryCrossing(userX, userY) {
    // let sc = globalConfig.scaler;

    // const w = 5*sc;
    // const h = 5*sc;
    // for (let i = 0; i < pools.length; i++) {
    //     const x = pools[i].x * sc + sc;
    //     const y = pools[i].y * sc + sc;
    //     if (userX > x && userX < x + w && userY > y && userY < y+ h)
    //         return true;
    // }
    return false;
}