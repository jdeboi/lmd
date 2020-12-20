
export function getCenterModalDim(width, height) {
    let w = 540;
    let h = 400;
    let y = (height - h - 24) / 2;
    
    let padding = 20;
    let heading = 36;
    let barH = 24;
    let barBot = 80;
    if (width < 600) {
      w = width - padding*2;
      h = height - padding*2-barH-barBot-heading;
      y =  heading + padding;
    } 
    else if (height < 400) {
      w = 540;
      h = height - padding*2-barH-barBot;
      y =  heading + padding;
    }
    let x = (width - w) / 2;
    return {w, h,x,y};
}