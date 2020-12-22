const padding = 20;
const heading = 36; // top header
const barH = 24; // frame h
const barBot = 60; // mobile footer / landscape menu

export function getCenterModalDim(ui) {
    const { width, height, isMobile, orientation, size } = ui;


    if (isMobile) {
        if (orientation === "portrait")
            return getPortraitMobile(width, height);
        return getLandscapeMobile(width, height);
    }

    else {
        let w = 540;
        let h = 400;
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

function getLandscapeMobile(width, height) {
    const w = width - padding * 2 - barBot; // 60 = width of menu on left
    const h = height - padding * 2 - heading - barH;
    const x = barBot + padding;
    const y = padding + heading;
    return { w, h, x, y };
}

function getPortraitMobile(width, height) {
    const w = width - padding * 2; // 60 = width of menu on left
    const h = height - padding * 2 - barBot - barH - heading;
    const x = padding;
    const y = padding + heading;
    return { w, h, x, y };
}