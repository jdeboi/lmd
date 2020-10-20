import {doorCrossing, boundaryCrossing} from './Boundaries';


export default class Room {




  constructor(p5, i, config, globalConfig) {
    const roomsInit = [
      {id: "B", title: "bathroom", x: -5, y: 12, rot: -90, dir: "right"},
      {id: 0, title: "gift-shop", x: 20, y: 22, rot: 90, dir: "left"},
      {id: 1, title: "macbook-air", x: 5, y: 22, rot: -90, dir: "right"},
      {id: 2, title: "wet-streams", x: 12, y: 13, rot: 0, dir: "bottom"},
      {id: 3, title: "hard-drives-on-seashores", x: 12, y: 8, rot: -90, dir: "right"},
      {id: 4, title: "jungle-gyms", x: 7, y: 8, rot: 90, dir: "left"},
      {id: 5, title: "wasted-days-are-days-wasted", x: 0, y: 17, rot: -90, dir: "right"},
      {id: 6, title: "esc-to-mars", x: 0, y: 0, rot: 0, dir: "bottom"},
      {id: 7, title: "xfinity-depths", x: 5, y: 0, rot: 0, dir: "bottom"},
      {id: 8, title: "cloud-confessional", x: 10, y: 0, rot: 0, dir: "bottom"},
      {id: 9, title: "same-storm-different-boat", x: 15, y: 0, rot: 0, dir: "bottom"},
      // {id: 9, title: "tbd", x: 20, y: 0, rot: 0, dir: "bottom"},
      {id: 10, title: "tbd", x: 27, y: 5, rot: 90, dir: "left"},
      {id: 11, title: "tbd", x: 27, y: 10, rot: 90, dir: "left"},
      {id: 12, title: "tbd", x: 27, y: 15, rot: 90, dir: "left"},
    ];
    const room = roomsInit[i];

    this.p5 = p5;
    this.x = room.x;
    this.y = room.y;
    this.rot = room.rot;
    this.dir = room.dir;
    this.title = room.title;
    this.config = config;
    this.globalConfig = globalConfig;

    this.w = 5;
    this.h = 5;
    this.start = 0;
    this.end = .2;

    this.config = config;
  }


  display(roomTextures, eyeIcon, roomCount) {

    this.p5.push();
    // this.p5.scale(this.globalConfig.scaler, this.globalConfig.scaler);
    var x = (this.x+this.w/2)*this.globalConfig.scaler;
    var y = (this.y+this.h/2)*this.globalConfig.scaler;
    this.p5.translate(x,y);

    this.p5.push();
    // let rad = deg/180*p5.PI;
    // this.p5.rotate(rad);
    // p5.translate(-w*p5.cos(rad), -h*p5.sin(rad));

    x = -this.w/2*this.globalConfig.scaler;
    y =-this.h/2*this.globalConfig.scaler;
    var w = this.w *this.globalConfig.scaler;
    var h = this.h *this.globalConfig.scaler;

    // if (roomTextures[0] && this.dir === "up") this.p5.image(roomTex, x, y, w, h);
    if (roomTextures[0] && this.dir === "bottom") this.p5.image(roomTextures[0], x, y, w, h);
    else if (roomTextures[1] && this.dir === "right") this.p5.image(roomTextures[1], x, y, w, h);
    else if (roomTextures[2]) this.p5.image(roomTextures[2], x, y, w, h);

    // draw watching icon
    // if (roomCount) {
    var count = 0;
    if (roomCount) count = roomCount[this.title];
    this.drawEye(eyeIcon, count);
    // }
    //
    // this.p5.push();
    // this.p5.translate(-this.w/2*this.globalConfig.scaler, -this.h/2*this.globalConfig.scaler)
    // this.p5.noFill();
    // this.p5.stroke(255);
    // this.p5.strokeWeight(10);
    // this.p5.rect(5, 5, this.w*this.globalConfig.scaler-10, this.h*this.globalConfig.scaler-10);
    // this.p5.stroke(0);
    // this.p5.strokeWeight(1);
    // this.p5.rect(0, 0, this.w*this.globalConfig.scaler, this.h*this.globalConfig.scaler);
    // this.p5.rect(10, 10, this.w*this.globalConfig.scaler-20, this.h*this.globalConfig.scaler-20);
    // this.p5.pop();

    this.p5.pop();

    // p5.textSize(50);
    // p5.fill(0, 255, 0);
    // if (count) p5.text(count, 0, 0)


    this.p5.pop();

  }

  drawEye(eyeIcon, rc) {
    var count = 0;
    if (rc) count = rc;
    if (eyeIcon) {
      const w = (this.p5.textWidth(count) + 50);
      const h = 30;
      this.p5.push();
      this.p5.translate(-w/2, -h/2);
      this.p5.fill(255, 100);
      this.p5.stroke(255);
      this.p5.strokeWeight(2);
      this.p5.rect(0, 0, w, h, 10, 10);
      this.p5.image(eyeIcon, 10, 5, 20, 20);

      this.p5.fill(0);
      this.p5.noStroke();
      this.p5.textSize(18);
      this.p5.text(count, 35, 20);
      this.p5.pop();
    }
  }

  displayOutline(p5=this.p5, scaler=this.globalConfig.scaler) {
    var w = this.w*scaler;
    var h = this.h*scaler;
    // if (rooms[i].id === "B") h = 7*scaler;
    p5.push();
    p5.translate(this.x*scaler, this.y*scaler);
    p5.rect(0, 0, w, h);

    // label
    // p5.strokeWeight(1);
    // p5.fill(255, 0, 255);
    // p5.text(rooms[i].id, 10, 0)
    p5.pop();
  }


  roomDoorCrossing(userStep) {
    var x0, x1, y0, y1;
    if (this.dir === "bottom") {
      x0 = this.x + this.w*this.start;
      x1 = this.x + this.w*this.end;
      y0 = this.y + this.h;
      y1 = this.y + this.h;
    }
    else if (this.dir === "left") {
      y0 = this.y + this.h*this.start;
      y1 = this.y + this.h*this.end;
      x0 = this.x;
      x1 = this.x;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h*this.start;
      y1 = this.y + this.h*this.end;
      x0 = this.x + this.w;
      x1 = this.x + this.w;
    }
    const doorC = {x0: x0, y0: y0, x1: x1, y1: y1, to: this.title};
    return doorCrossing(userStep, doorC, this.globalConfig);
  }

  roomBoundaryCrossing(userStep) {
    const roomWalls = [
      {x: (this.x), y:this.y},
      {x: (this.x+this.w), y:this.y},
      {x: (this.x+this.w), y:(this.y+this.h)},
      {x: (this.x), y:(this.y+this.h)},
      {x: (this.x), y:this.y}
    ];
    return boundaryCrossing(userStep, roomWalls, this.globalConfig);
  }
}
