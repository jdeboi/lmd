import { roomConfig, globalConfig } from '../../constants';
import {doorCrossing, boundaryCrossing, doorLineCrossing, boundaryLineCrossing} from './Boundaries';


export default class Room {




  constructor(p5, i) {
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

    this.w = 5;
    this.h = 5;
    this.start = 0;
    this.end = .2;
  }


  display(roomTextures, eyeIcon, roomCount) {

    this.p5.push();
   
    // this.p5.scale(globalConfig.scaler, globalConfig.scaler);
    var x = (this.x+this.w/2)*globalConfig.scaler;
    var y = (this.y+this.h/2)*globalConfig.scaler;
    this.p5.translate(x,y);

 

    this.p5.push();
    // let rad = deg/180*p5.PI;
    // this.p5.rotate(rad);
    // p5.translate(-w*p5.cos(rad), -h*p5.sin(rad));

    x = -this.w/2*globalConfig.scaler;
    y =-this.h/2*globalConfig.scaler;
    var w = this.w *globalConfig.scaler;
    var h = this.h *globalConfig.scaler;

    // if (roomTextures[0] && this.dir === "up") this.p5.image(roomTex, x, y, w, h);
    if (roomTextures[0] && this.dir === "bottom") this.p5.image(roomTextures[0], x, y, w, h);
    else if (roomTextures[1] && this.dir === "right") this.p5.image(roomTextures[1], x, y, w, h);
    else if (roomTextures[2]) this.p5.image(roomTextures[2], x, y, w, h);

    // draw watching icon
    // if (roomCount) {
    var count = 0;
    if (roomCount) count = roomCount[this.title];
    this.drawEye(eyeIcon, count);
   
  
   

    this.p5.pop();

    // p5.textSize(50);
    // p5.fill(0, 255, 0);
    // if (count) p5.text(count, 0, 0)

 
    this.p5.pop();

    // this.drawRoomDoorEntryCrossing();
    // this.drawRoomDoorCrossing();
    // this.drawRoomDoorBoundary();

    // if (this.closeToDoor()) {
    //   this.p5.noFill();
    //   for (let i = 4 ; i > 0; i--) {
    //     this.p5.strokeWeight(i*4);
    //     this.p5.stroke(255, this.p5.map(i, 4, 1, 10, 140));
    //     this.displayOutline();
    //   }
    // }

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

  displayOutline(p5=this.p5, scaler=globalConfig.scaler) {
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

  /////////////////////////////////////////////////////
  // time to go to a new room; this is 90deg from entrance
  drawRoomDoorCrossing(p5=this.p5) {
    var x0, x1, y0, y1;
    let sc = globalConfig.scaler;
    if (this.dir === "bottom") {
      x0 = this.x+1;
      x1 = this.x+1;
      y0 = this.y + this.h;
      y1 = this.y + this.h- this.h*this.end;
    }
    else if (this.dir === "left") {
      y0 = this.y+1;
      y1 = this.y + 1
      x0 = this.x;
      x1 = this.x+1;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h-1;
      y1 = this.y + this.h - 1;
      x0 = this.x + this.w-1;
      x1 = this.x + this.w;
    }
    p5.stroke(255, 0, 0);
    p5.strokeWeight(10);
    
    p5.line(x0*sc, y0*sc, x1*sc, y1*sc);
  }

  
  
  roomDoorCrossing(prevStep, userStep, id=0) {
    var x0, x1, y0, y1;
    let sc = globalConfig.scaler;
    if (this.dir === "bottom") {
      x0 = this.x+1;
      x1 = this.x+1;
      y0 = this.y + this.h;
      y1 = this.y + this.h- this.h*this.end;
    }
    else if (this.dir === "left") {
      y0 = this.y+1;
      y1 = this.y + 1
      x0 = this.x;
      x1 = this.x+1;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h-1;
      y1 = this.y + this.h - 1;
      x0 = this.x + this.w-1;
      x1 = this.x + this.w;
    }
    const doorC = {x0: x0, y0: y0, x1: x1, y1: y1, to: this.title};
    // return doorCrossing(userStep, doorC, globalConfig);
    return doorLineCrossing(prevStep, userStep, doorC, globalConfig);
  }

  /////////////////////////////////////////////////////
  // stop our forward progress
  // step from door entrance
  roomDoorBoundary(prevStep, userStep) {
    var x0, x1, y0, y1;
    let st = globalConfig.stepS;
    let sc = globalConfig.scaler;
    if (this.dir === "bottom") {
      x0 = this.x + this.w*this.start;
      x1 = this.x + this.w*this.end;
      y0 = this.y + this.h-1;
      y1 = this.y + this.h-1;
    }
    else if (this.dir === "left") {
      y0 = this.y;
      y1 = this.y + 1
      x0 = this.x+1;
      x1 = this.x+1;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.h*this.end;
      x0 = this.x + this.w-1;
      x1 = this.x + this.w-1;
    }
    const doorC = {x0: x0, y0: y0, x1: x1, y1: y1, to: this.title};
    // return doorCrossing(userStep, doorC, globalConfig);
    return doorLineCrossing(prevStep, userStep, doorC, globalConfig);
  }

  drawRoomDoorBoundary(p5=this.p5) {
    var x0, x1, y0, y1;
    let st = globalConfig.stepS;
    let sc = globalConfig.scaler;
    if (this.dir === "bottom") {
      x0 = this.x + this.w*this.start;
      x1 = this.x + this.w*this.end;
      y0 = this.y + this.h-1;
      y1 = this.y + this.h-1;
    }
    else if (this.dir === "left") {
      y0 = this.y;
      y1 = this.y + 1
      x0 = this.x+1;
      x1 = this.x+1;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.h*this.end;
      x0 = this.x + this.w-1;
      x1 = this.x + this.w-1;
    }
    const doorC = {x0: x0, y0: y0, x1: x1, y1: y1, to: this.title};
    p5.stroke(255, 0, 255);
    p5.strokeWeight(10);
    p5.line(x0*sc, y0*sc, x1*sc, y1*sc);
  }

  /////////////////////////////////////////////////////
  // we have entered the room, but not yet loading new room
  roomDoorEntryCrossing(prevStep, userStep) {
    var x0, x1, y0, y1;
    if (this.dir === "bottom") {
      x0 = Math.floor(this.x + this.w*this.start);
      x1 = Math.floor(this.x + this.w*this.end);
      y0 = Math.floor(this.y + this.h);
      y1 = Math.floor(this.y + this.h);
    }
    else if (this.dir === "left") {
      y0 = this.y + this.h*this.start;
      y1 = this.y + this.h*this.end;
      x0 = this.x;
      x1 = this.x;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.h*this.end;
      x0 = this.x + this.w;
      x1 = this.x + this.w;
    }
    const doorC = {x0: x0, y0: y0, x1: x1, y1: y1, to: this.title};
    // return doorCrossing(userStep, doorC, globalConfig);
    return doorLineCrossing(prevStep, userStep, doorC, globalConfig);
  }

  drawRoomDoorEntryCrossing(p5=this.p5) {
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
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.h*this.end;
      x0 = this.x + this.w;
      x1 = this.x + this.w;
    }
    p5.stroke(0, 255, 0);
    p5.strokeWeight(10);
    let sc = globalConfig.scaler;
    p5.line(x0*sc, y0*sc, x1*sc, y1*sc);
  }

  roomBoundaryCrossing(prevStep, userStep) {
    const roomWalls = [
      {x: (this.x), y:this.y},
      {x: (this.x+this.w), y:this.y},
      {x: (this.x+this.w), y:(this.y+this.h)},
      {x: (this.x), y:(this.y+this.h)},
      {x: (this.x), y:this.y}
    ];
    return boundaryLineCrossing(prevStep, userStep, roomWalls, globalConfig);
    // return boundaryCrossing(userStep, roomWalls, globalConfig);
  }
}
