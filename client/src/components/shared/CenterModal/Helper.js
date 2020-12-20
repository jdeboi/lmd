
export function getCenterModalDim(width, height) {
    let w = 540;
    let h = 400;
    if (width < 600) {
      w = width - 40;
      h = height - 30-34-24;
    } 
    else if (height < 400) {
      w = 540;
      h = height - 30-34-24;
    }
    return {w, h};
}