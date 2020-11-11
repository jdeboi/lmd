
export const globalConfig = {
    scaler: 80,
    minX: 0,
    maxX: 27,
    minY: 5,
    maxY: 27,
    x: -15,
    y: -35,
    stepS : 80
}

const sc = globalConfig.scaler;

export const p5ToDomCoords = (x, y) => {
    let xx =  (x + globalConfig.x) * globalConfig.scaler;
    let yy = (y + globalConfig.y) * globalConfig.scaler;
    return { x: xx, y: yy }
}


///// doors
export const outsideDoors = [
    {x0: 22.5 , y0: 5, x1: 24, y1: 5, to:"outside"}, // top
      {x0: 0 , y0: 8.5, x1: 0, y1: 10, to:"outside"}, // left
      {x0: 14 , y0: 27, x1: 16, y1: 27, to:"outside"}, // bottom
      {x0: 22.5 , y0: 15, x1: 24, y1: 15, to:"outside"}, // right
];
const outsideDoorFramesInit = [];
for (const door of outsideDoors) {
    outsideDoorFramesInit.push(p5ToDomCoords((door.x0+door.x1)/2, (door.y0+door.y1)/2));
}
export const outsideDoorFrames = outsideDoorFramesInit;


///// lights
export const lights = [
    p5ToDomCoords(3, 10),
    p5ToDomCoords(8, 15),
    p5ToDomCoords(13, 20)
];


//// wine
const wineBot0 = p5ToDomCoords(-3, 0);
const wineBot1 = p5ToDomCoords(30, 17);
export const wineLocation = [{ x: wineBot0.x, y: wineBot0.y, w: 80, h: 150 }, { x: wineBot1.x, y: wineBot1.y, w: 80, h: 150 }];


//// dance dance dance
const danceFloorP5 = { x: 24, y: -4, w: 10, h: 5 };
export const danceFloor = { x: globalConfig.scaler * danceFloorP5.x, y: globalConfig.scaler * danceFloorP5.y, w: globalConfig.scaler * danceFloorP5.w, h: globalConfig.scaler * danceFloorP5.h };
export const djLocation = p5ToDomCoords(danceFloorP5.x, danceFloorP5.y-2);


export const ok = {};