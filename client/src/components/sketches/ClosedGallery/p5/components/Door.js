import Draggable from './Draggable/Draggable';
import { doorLineCrossing } from './Boundaries';
import { domCoordsToP5World, outsideDoors, globalConfig } from '../../constants';

export default class Door extends Draggable {

  constructor(p5, id, imgs) {
    super(id, 0, 0, 0, 0, p5, null);
    this.isFlipped = this.id === 1;

    this.scaler = globalConfig.scaler/100;
    if (this.isFlipped) {
      this.w = 180;
      this.h = 500;
    }
    else {
      this.w = 500;
      this.h = 180;
    }
    this.w *= this.scaler;
    this.h *= this.scaler;
    this.point = outsideDoors[id];
    this.x = this.point.x0 * globalConfig.scaler;
    this.y = this.point.y0 * globalConfig.scaler;

    if (this.id === 2) {
      this.x -= 150*this.scaler;
      this.y -= this.h + 24;
    }
    else if (!this.isFlipped) {
      this.x -= 180*this.scaler;
      this.y -= this.h + 24;

    }
    else {
      this.x -= 2;
      this.y -= this.w + 34;
    }
    this.config = globalConfig;

    this.imgs = imgs;

    this.isOpen = true;
    this.openAmt = 0;


  }

  checkOpen(user, users) {

    // if (!this.isFlipped) {
    let coord = domCoordsToP5World(user.x, user.y);
    if (this.p5.dist(coord.x, coord.y, this.x + this.w / 2, this.y + this.h / 2) < 250) {
      return true;
    }
    for (const usr of users) {
      let coord = domCoordsToP5World(usr.x, usr.y);
      if (this.p5.dist(coord.x, coord.y, this.x + this.w / 2, this.y + this.h / 2) < 250) {

        return true;
      }
    }
    return false;
    // }
  }

  openDoor(user, users) {
    this.isOpen = this.checkOpen(user, users);
    let speed = 10;
    let maxOpen = 124*this.scaler;
    if (this.isOpen) {
      this.openAmt += speed;
      if (this.openAmt > maxOpen)
        this.openAmt = maxOpen;
    }
    else {
      this.openAmt -= speed;
      if (this.openAmt < 0)
        this.openAmt = 0;
    }
  }

  displayContent(userX, userY) {

    let w = this.w;
    let h = this.h;
    if (this.isFlipped) {
      w = this.h;
      h = this.w;
    }

    this.p5.push();
    if (this.isFlipped) {
      this.p5.rotate(Math.PI / 2);
      this.p5.translate(26, -h);
    }
    else this.p5.translate(0, 26);
    this.p5.image(this.imgs[0], 0, 0, w, h);
    this.p5.image(this.imgs[1], -this.openAmt, 0, w, h);
    this.p5.push();
    this.p5.scale(-1, 1);
    this.p5.image(this.imgs[1], -this.openAmt - w, 0, w, h);
    this.p5.pop();
    this.p5.pop();
  }

  displayLine(p5 = this.p5, scaler = this.config.scaler) {
    p5.line(this.point.x0 * scaler, this.point.y0 * scaler, this.point.x1 * scaler, this.point.y1 * scaler);
  }

  doorCrossing(prevStop, userStep) {
    return doorLineCrossing(prevStop, userStep, this.point, this.config);
  }
}
