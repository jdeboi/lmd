const padding = 15;
const heading = 60; // top header
const barH = 26; // frame h
const barBot = 60; // mobile footer / landscape menu
const minW = 540;
const minH = 400;

export function getCenterModalDim(ui) {
    const { width, height, isMobile, orientation, size } = ui;


    if (width < (minW + padding*2) || height < (minH+padding*2 + barH + heading)) {
        if (orientation === "portrait")
            return getPortraitSmall(width, height);
        return getLandscapeSmall(width, height);
    }

    else {
        let w = minW;
        let h = minH;
        let y = (height - h - barH) / 2;


        if (width < 600) {
            w = width - padding * 2;
            h = height - padding * 2 - barH - barBot - heading;
            y = heading + padding;
        }
        else if (height < 400) {
            w = 540;
            h = height - padding * 2 - barH - barBot;
            y = heading + padding;
        }
        let x = (width - w) / 2;
        return { w, h, x, y };
    }


}

function getLandscapeSmall(width, height) {
    const w = width - padding * 2 - barBot; // 60 = width of menu on left
    const h = height - padding - heading - barH;
    // const x = barBot + padding;
    const x = padding;
    const y = heading;
    return { w, h, x, y };
}

function getPortraitSmall(width, height) {
    const w = width - padding * 2; // 60 = width of menu on left
    const h = height - padding * 2 - barBot - barH - heading;
    const x = padding;
    const y = padding + heading;
    return { w, h, x, y };
}