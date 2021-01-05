import p5 from "p5";

const sc = 70;
export const globalConfig = {
    scaler: sc,
    minX: 0,
    maxX: 27,
    minY: 5,
    maxY: 27,
    x: -15,
    y: -35,
    stepS: sc
}

export const roomConfig = {
    w: 5,
    h: 5,
    start: .1,
    end: .8
}

export const p5ToDomCoords = (x, y) => {
    let xx = (x + globalConfig.x) * globalConfig.scaler;
    let yy = (y + globalConfig.y) * globalConfig.scaler;

    
    return { x: xx, y: yy }
}

export const mouseToWorld = (userEase, p5) => {
    let x = p5.mouseX - p5.windowWidth/2;
    let y = p5.mouseY - p5.windowHeight/2;

    const worldUser = domCoordsToP5World(userEase.x, userEase.y);
    x += worldUser.x;
    y += worldUser.y;
    return {x, y};
}

export const domCoordsToP5 = (x, y) => {
    let xx = x / globalConfig.scaler - globalConfig.x;
    let yy = y / globalConfig.scaler - globalConfig.y;
    return { x: xx, y: yy }
}

export const domCoordsToP5World = (x, y) => {
    let p = domCoordsToP5(x, y);
    let xx = p.x* globalConfig.scaler;
    let yy = p.y * globalConfig.scaler;
    return { x: xx, y: yy }
}

export const rooms = [
    { id: "B", title: "bathroom", label: "bathroom", x: -5, y: 12, rot: -90, dir: "right", about: "go pee" },
    { id: 0, title: "gift-shop", label: "gift shop", x: 20, y: 22, rot: 90, dir: "left", about: "buy something!" },
    { id: 1, title: "macbook-air", label: "macbook air", x: 5, y: 22, rot: -90, dir: "right", about: "interior/exterior spaces online" },
    { id: 2, title: "wet-streams", label: "wet streams", x: 12, y: 13, rot: 0, dir: "bottom", about: "thinking about internet sexuality, online homemaking" },
    { id: 3, title: "hard-drives-on-seashores", label: "hard drives on seashores", x: 12, y: 8, rot: -90, dir: "right", about: "thinking about digital escape" },
    { id: 4, title: "jungle-gyms", label: "jungle gyms", x: 7, y: 8, rot: 90, dir: "left", about: "thinking about confined covid space" },
    { id: 5, title: "wasted-days", label: "wasted days", x: 0, y: 17, rot: -90, dir: "right", about: "thinking about quarantine time" },
    { id: 6, title: "esc-to-mars", label: "esc to mars", x: 0, y: 0, rot: 0, dir: "bottom", about: "thinking about digital escape" },
    { id: 7, title: "xfinity-depths", label: "xfinity depths", x: 5, y: 0, rot: 0, dir: "bottom", about: "thinking about infinite scroll" },
    { id: 8, title: "cloud-confessional", label: "cloud confessional", x: 10, y: 0, rot: 0, dir: "bottom", about: "thinking about the quality of online social space" },
    { id: 9, title: "blind-eye", label: "blind eye", x: 15, y: 0, rot: 0, dir: "bottom", about: "thinking about digital privacy, accessibility" },
    // {id: 9, title: "tbd", x: 20, y: 0, rot: 0, dir: "bottom"},
    { id: 10, title: "flush", label: "flush", x: 27, y: 5, rot: 90, dir: "left", about: "thinking about internet vortexes, blackholes, shitholes..." },
    { id: 11, title: "home-page", label: "home page", x: 27, y: 10, rot: 90, dir: "left", about: "thinking about digital privacy, digital/analog movement" },
];


let xMin = -10;
let xMax = 35;
let yMin = -3;
let yMax = 42;
export const limits = [
    { x: xMin, y: yMin }, // outer limit
    { x: xMax, y: yMin },
    { x: xMax, y: yMax },
    { x: xMin, y: yMax },
    { x: xMin, y: yMin }
];

let startX = limits[0].x;
let startY = 22;
export const pools = [
    { x: startX, y: startY },
    { x: startX + 5, y: startY + 5 },
    { x: startX + 10, y: startY + 10 },
];
export const poolSpace = 1;//.5;

export const limitsDiv = [
    p5ToDomCoords(limits[0].x, limits[0].y),
    p5ToDomCoords(limits[1].x, limits[1].y),
    p5ToDomCoords(limits[2].x, limits[2].y)
];


///// doors
export const outsideDoors = [
    { x0: 22.5, y0: 5, x1: 24, y1: 5, to: "outside" }, // top
    { x0: 0, y0: 8.5, x1: 0, y1: 10, to: "outside" }, // left
    { x0: 14, y0: 27, x1: 16, y1: 27, to: "outside" }, // bottom
    { x0: 22.5, y0: 15, x1: 24, y1: 15, to: "outside" }, // right
];
const outsideDoorFramesInit = [];
for (const door of outsideDoors) {
    outsideDoorFramesInit.push(p5ToDomCoords((door.x0 + door.x1) / 2, (door.y0 + door.y1) / 2));
}
export const outsideDoorFrames = outsideDoorFramesInit;


///// lights
export const lightsOG = [
    {x: 22.5, y: 7},
    {x: 8, y: 15},
    {x: 13, y: 20}
]
export const lights = [
    p5ToDomCoords(lightsOG[0].x, lightsOG[0].y),
    p5ToDomCoords(lightsOG[1].x, lightsOG[1].y),
    p5ToDomCoords(lightsOG[2].x, lightsOG[2].y),
    p5ToDomCoords(13, 20),
    p5ToDomCoords(7, 13)
];


//// wine
const cheeseBot = p5ToDomCoords(-8.5, 5); // cheese
const wineBot1 = p5ToDomCoords(30, 17);
const cocktailBot = p5ToDomCoords(32, 0);
export const wineLocation = [{ x: cheeseBot.x, y: cheeseBot.y, w: 80, h: 250, flipped:true }, { x: wineBot1.x, y: wineBot1.y, w: 80, h: 150, flipped: false }, { x: cocktailBot.x, y: cocktailBot.y, w: 80, h: 150, flipped:false }];


//// dance dance dance
const danceFloorP5 = { x: 24-3, y: -1, w: 10, h: 5 };
export const danceFloor = { x: globalConfig.scaler * danceFloorP5.x, y: globalConfig.scaler * danceFloorP5.y, w: globalConfig.scaler * danceFloorP5.w, h: globalConfig.scaler * danceFloorP5.h };
export const djLocation = p5ToDomCoords(danceFloorP5.x + 3.5, danceFloorP5.y-1);


export const ok = {};