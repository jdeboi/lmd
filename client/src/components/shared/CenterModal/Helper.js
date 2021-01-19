const padding = 15;
const heading = 60; // top header
const barH = 26; // frame h
const barBot = 60; // mobile footer / landscape menu
const minW = 540;
const minH = 400;
const borderW = 2;

export function getCenterModalDim(ui, isRelative) {
    const { width, height, isMobile, orientation, size } = ui;


    if (width < (minW + padding * 2) || height < (minH + padding * 2 + barH + heading)) {
        if (orientation === "portrait")
            return getPortraitSmall(width, height, isRelative);
        return getLandscapeSmall(width, height, isRelative);
    }

    else {
        let w = minW;
        let h = minH;
        let y = (height - h - barH) / 2;
        if (isRelative)
            y += barH;

        if (width < 600) {
            w = width - padding * 2;
            h = height - padding * 2 - barH - barBot - heading;
            let y = padding; // + heading;
            if (!isRelative)
                y += heading;
        }
        else if (height < 400) {
            w = 540;
            h = height - padding * 2 - barH - barBot;
            let y = padding; // + heading;
            if (!isRelative)
                y += heading;
        }
        let x = (width - w) / 2 - borderW;
        return { w, h, x, y };
    }


}

function getLandscapeSmall(width, height, isRelative) {
    const w = width - padding * 2 - barBot; // 60 = width of menu on left
    const h = height - padding - heading - barH;
    // const x = barBot + padding;
    const x = padding;
    const y = heading;
    return { w, h, x, y };
}

function getPortraitSmall(width, height, isRelative) {

    const w = width - padding * 2 - borderW * 2; // 60 = width of menu on left
    const h = height - padding * 2 - barBot - barH - heading;
    const x = padding - borderW;
    let y = padding; // + heading;
    if (!isRelative)
        y += heading;
    return { w, h, x, y };
}