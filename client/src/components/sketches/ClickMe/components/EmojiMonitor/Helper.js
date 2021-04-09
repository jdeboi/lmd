import { mapVal, constrain } from '../../../../shared/Helpers/Helpers';

export function getDim(ui) {
    if (ui.hasFooter || ui.isMobile) {
        if (ui.orientation === "landscape")
            return getMobileDimHoriz(ui);
        else
            return getMobileDimVert(ui);
    }
    return getDimDesktop(ui);
}

const maxFontS = 60;

function getMobileDimHoriz(ui) {
    let isVert = false;
    let w;

    let buttonW = 80;
    let buttonH = 34;
    let buffer = 20;
    let availW = ui.contentW - 3 * buffer - buttonW;

    let fontS = mapVal(availW, 0, 800, 18, 32);
    fontS = Math.floor(constrain(fontS, 18, 32));
    let h = fontS + 10;
    // buttonW = h;
    buttonH = h;

    let repeats = Math.floor(availW / fontS / 5);
    w = repeats * 5 * fontS + 10;

    buttonW = Math.floor((h / buttonH) * buttonW);

    let barW = buttonW + w + buffer;
    let xB = (ui.contentW - barW) / 2;
    let x = xB + buttonW + buffer;
    let y = ui.contentH - h - ui.toolbarH - 20;
    let yB = y;

    return { x, y, w, h, xB, yB, bW: buttonW, bH: buttonH, fontS, repeats, isVert };
}

function getMobileDimVert(ui) {
    let isVert = true;
    let w = 80;

    let buffer = 20;
    let buttonH = 80;
    let buttonW = 80;

    let availH = ui.contentH - 3 * buffer - ui.toolbarH * 2 - buttonH;

    let fontS = mapVal(availH, 0, 800, 18, 32);
    fontS = Math.floor(constrain(fontS, 18, 32));


    let repeats = Math.floor(availH / fontS / 5);
    let h = repeats * 5 * fontS + 10;

    let barH = ui.toolbarH * 2 + buttonH + h + buffer;
    let yB = (ui.contentH - barH) / 2;
    let y = yB + ui.toolbarH + buttonH + buffer;
    let x = ui.contentW - w - buffer;
    let xB = x;

    return { x, y, xB, yB, bW: buttonW, bH: buttonH, w, h, fontS, repeats, isVert };
}

function getDimDesktop(ui) {
    let isVert = false;
    let w = 80;
    let x, y;

    let availLen = 0;
    let buffer = 20;


    if (isVert) {
        availLen = ui.contentH - 2 * buffer - ui.toolbarH;
    }
    else {
        availLen = ui.contentW - 2 * buffer;
    }
    let fontS = mapVal(ui.contentW, 1400, 2500, 30, maxFontS);
    fontS = Math.floor(constrain(fontS, 30, maxFontS));

    let maxLen = fontS * 20 + 10;
    let h = Math.min(availLen, maxLen);

    let repeats = Math.floor(h / fontS / 5);
    h = repeats * 5 * fontS + 10;

    if (!isVert) {
        w = h;
        h = fontS + 10;
        y = (ui.contentH - h - ui.toolbarH) * .9;
        x = (ui.contentW - w) / 2;
    }
    else {
        y = (ui.contentH - h - ui.toolbarH) / 2;
        x = ui.contentW * .1;
    }

    return { x, y, w, h, bW: 0, bH: 0, fontS, repeats, isVert };

}
