import Button from './Button';
import { globalConfig } from "../../../constants";

export default class Draggable {
  constructor(id, x, y, w, h, p5) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.origX = this.x;
    this.origY = this.y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.toolbarH = 25;
    this.opacity = p5.map(this.id, 0, 20, 0, 1);
    this.startDrag = { x: 0, y: 0 };
    this.startDragCoords = {x: 0, y: 0};

    this.dragging = false;
    this.locked = false;

    this.closed = false;
    this.minimized = false;

    this.barH = 26;
    this.bRad = 10;

    let xp = 15;
    let yp = 12;
    let sp = 20;
    this.closeButton = new Button(xp, yp, p5);
    this.minButton = new Button(xp + sp, yp, p5);
    this.maxButton = new Button(xp + sp * 2, yp, p5);
  }

  display(userX, userY) {
    this.p5.push();
    this.p5.translate(this.x, this.y);
    if (!this.closed) {
      if (!this.minimized) this.displayContent();
      this.displayToolBar(userX, userY);
    }
    this.p5.pop();
  }

  displayToolBar(userX, userY) {



    this.p5.fill(0);
    this.p5.noStroke();
    if (!this.minimized) this.p5.rect(0, 10, this.w, (this.barH - 10));
    this.p5.rect(0, 0, this.w, this.barH, this.bRad);

    let gx = globalConfig.x * globalConfig.scaler;
    let gy = globalConfig.y * globalConfig.scaler;
    let mx = this.p5.mouseX + userX - gx - this.p5.windowWidth / 2 - this.x;
    let my = this.p5.mouseY + userY - gy - this.p5.windowHeight / 2 - this.y;

    this.closeButton.display(mx, my);
    this.minButton.display(mx, my);
    this.maxButton.display(mx, my);
  }

  displayContent() {
    this.p5.fill(255);
    this.p5.stroke(0);
    this.p5.strokeWeight(2);
    this.p5.rect(0, 0, this.w, this.h, this.bRad);
  }

  checkButtons(userX, userY) {
    let gx = globalConfig.x * globalConfig.scaler;
    let gy = globalConfig.y * globalConfig.scaler;

    let mx = this.p5.mouseX + userX - gx - this.p5.windowWidth / 2 - this.x;
    let my = this.p5.mouseY + userY - gy - this.p5.windowHeight / 2 - this.y;
    if (this.closeButton.mouseOver(mx, my)) {
      this.closeWindow();
      return true;
    }
    else if (this.minButton.mouseOver(mx, my)) {
      this.toggleMinimze();
      return true;
    }
    else if (this.maxButton.mouseOver(mx, my)) {
      this.maximizeWindow();
      return true;
    }
    return false;
  }

  checkDragging(userX, userY) {
    let gx = globalConfig.x * globalConfig.scaler;
    let gy = globalConfig.y * globalConfig.scaler;

    let mx = this.p5.mouseX - gx + userX - this.p5.windowWidth / 2;
    let my = this.p5.mouseY - gy + userY - this.p5.windowHeight / 2;
    // console.log(mx, my, userX, userY, this.x, this.y);
    if (this.overToolBar(mx, my)) {
      // console.log("over toolbar");
      // this.draggingOn(mx, my);
      this.dragging = true;
      this.startDrag.x = this.p5.mouseX;
      this.startDrag.y = this.p5.mouseY;
      this.startDragCoords.x = this.x;
      this.startDragCoords.y = this.y;
      return true;
    }
    return false;
  }

  overToolBar(mx, my) {
    return mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.barH;
  }

  // draggingOn(mx, my) {
  //   // dragging.dragging = true;
  //   this.offsetX = this.p5.mouseX - this.startDrag.x;
  //   this.offsetY = this.p5.mouseY - this.startDrag.y;
  // }

  endDrag() {
    this.dragging = false;
  }

  update() {
    if (this.dragging) {
      this.offsetX = this.p5.mouseX - this.startDrag.x;
      this.offsetY = this.p5.mouseY - this.startDrag.y;

      this.x = this.startDragCoords.x + this.offsetX;
      this.y = this.startDragCoords.y + this.offsetY;
    }
  }

  toggleCloseWindow(div) {
    this.locked = !this.locked;
    this.closeWindow(div);
  }

  closeWindow() {
    // div.style("display", "none");
    this.closed = true;
  }

  maximizeWindow() {
    this.x = this.origX;
    this.y = this.origY;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  resetWindow(div = this.div) {
    this.x = this.origX;
    this.y = this.origY;
    this.locked = false;
    this.closeWindow(div);
    div.position(this.x, this.y);
    div.style("display", "block");
    this.minimized = false;
    this.minimizeWindow(this.content);
    this.setSize(400);
  }

  toggleMinimze() {
    this.minimized = !this.minimized;
  }
}


// class Draggable {

//     constructor(x, y, w , h) {
//         this.barH = 26;
//         this.bRad = 10;
//     }

//     display() {

//     }

//     displayToolBar(p5) {
//         p5.fill(0);
//         p5.noStroke();
//         p5.rect(this.x, this.y+10, this.x+this.w, this.y+(this.barH-10));
//         p5.rect(this.x, this.y, this.w, this.h, this.bRad);
//     }

//     displayButtons(p5) {
//         p5.stroke(255);
//         p5.strokeWeight(2);
//         p5.noFill();
//     }


// }

// class closeButton