import React from "react";
import Sketch from "react-p5";

// import {doorCrossing, boundaryCrossing} from './components/Sketch/Boundaries';

import Wall from "./components/Wall";
import Room from "./components/Room";
import Door from "./components/Door";
import MiniMap from "./components/MiniMap";

var walls = [];
var rooms = [];
var doors = [];

var globalConfig = {
  scaler: 50,
  minX: 0,
  maxX: 27,
  minY: 5,
  maxY: 27
}
globalConfig.x = -15;
globalConfig.y = -35;

var roomConfig = {
  w: 5,
  h: 5,
  start: .1,
  end: .8
}

var miniMap;


var floorTex;
var palm;
var stairs, stairsBig;
var horizPlant, shrub;
var grasses = [];
var roomTextures = [];
var eyeIcon;

// const centerW = 1000;


export default (props) => {
  let x = 50;
  const y = 50;
  const user = props.user;
  const users = props.users;
  const roomCount = props.roomCount;

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    // img = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/jungleGyms/wallpaper3.jpg",
    // img => {p5.image(img, 0, 0);},
    // (err) => { console.log("ERR", err)}

    const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/homePage/";
    // const wallpaper = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/jungleGyms/wallpaper3.jpg";
    // const wood = "/assets/s3-bucket/homePage/wood.jpg";
    // const concrete = "/assets/s3-bucket/homePage/concrete.jpg";
    floorTex = p5.loadImage(url+"concrete-512.jpg");
    palm = p5.loadImage(url+"grass/palm.png");
    stairs = p5.loadImage(url+"grass/stairs.png");
    stairsBig = p5.loadImage(url+"grass/stairsbig.png");
    shrub = p5.loadImage(url+"grass/shrub_sm.jpg");
    horizPlant = p5.loadImage(url+"grass/seamless_shrub.jpg");
    grasses[0] =p5.loadImage(url+"grass/100.png");
    grasses[1] =p5.loadImage(url+"grass/200.png");
    grasses[2] =p5.loadImage(url+"grass/400.png");
    grasses[3] =p5.loadImage(url+"grass/1000.png");
    roomTextures[0] = p5.loadImage(url+"rooms/bottom.png");
    roomTextures[1] = p5.loadImage(url+"rooms/right.png");
    roomTextures[2] = p5.loadImage(url+"rooms/left.png");
    eyeIcon = p5.loadImage(url+"eye.png")


    for (let i = 0; i < 2; i++) {
      walls.push(new Wall(p5, i, globalConfig));
    }
    for (let i = 0; i < 13; i++) {
      rooms.push(new Room(p5, i, roomConfig, globalConfig));
    }
    for (let i = 0; i < 4; i++) {
      doors.push(new Door(p5, i, globalConfig));
    }

    miniMap = new MiniMap(p5, 50, p5.windowHeight - 200 - 80, 200, 200);
  };

  const draw = (p5) => {
    p5.clear();

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    p5.push();
    p5.translate(p5.windowWidth/2, p5.windowHeight/2);

    p5.push();
    p5.translate(-user.x, -user.y);

    // if (img) p5.image(img, 0, 0);

    p5.push();
    p5.translate(globalConfig.x*globalConfig.scaler, globalConfig.y*globalConfig.scaler)

    // ground
    drawGrass(p5);
    drawGround(p5);
    // drawPlants(p5);
    rightPatio(p5);

    // drawBorderPlants(p5);
    drawStairs(p5);

    // walls
    // p5.noFill();
    p5.stroke(255);
    p5.strokeWeight(10);
    drawWalls(p5);

    // rooms
    drawRooms(p5);
    // if (Math.random()>.99) console.log(roomCount);
    // doors
    p5.strokeWeight(10);
    p5.fill(255, 0, 0);
    p5.stroke(255, 0, 0);
    // drawDoors(p5);
    drawDanceFloor(p5);

    p5.pop();


    p5.pop();


    p5.stroke(255, 0, 255);
    p5.strokeWeight(2);
    p5.fill(255, 0, 255);
    p5.textSize(50);
    var str = (p5.round(user.x/globalConfig.scaler-globalConfig.x,1)) + ", " + (p5.round(user.y/globalConfig.scaler-globalConfig.y, 1)) + "";
    // var str = (user.x) + ", " + (user.y) + "";
    // p5.text(str, 0, 0)

    p5.pop();

    // drawMiniMap(p5);
    miniMap.update(user, users, walls, doors, rooms, globalConfig);
    miniMap.display();



  };

  const keyPressed = (p5) => {

    if (p5.keyCode === p5.UP_ARROW) {
      userTakeStep(p5, 0, -1);
    }
    else if (p5.keyCode === p5.RIGHT_ARROW) {
      userTakeStep(p5, 1, 0);
    }
    else if (p5.keyCode === p5.LEFT_ARROW) {
      userTakeStep(p5, -1, 0);
    }
    else if (p5.keyCode === p5.DOWN_ARROW) {
      userTakeStep(p5, 0, 1);
    }
  }


  const drawGround = (p5) => {
    if (floorTex) {
      // 1st
      for(let x = 0; x < 20; x+=5) {
        const w = 5*globalConfig.scaler;
        const h = 5*globalConfig.scaler;
        const ix = x*globalConfig.scaler;
        const iy = 2*globalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
      }
      // 2nd
      for(let x = 0; x < 30; x+=5) {
        const w = 5*globalConfig.scaler;
        const h = 5*globalConfig.scaler;
        const ix = x*globalConfig.scaler;
        const iy = 5*globalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
      }

      // 3rd
      for(let x = 0; x < 30; x+=5) {
        const w = 5*globalConfig.scaler;
        const h = 5*globalConfig.scaler;
        const ix = x*globalConfig.scaler;
        const iy = 10*globalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
      }
      // 4th row
      for(let x = 0; x < 15; x+=5) {
        const w = 5*globalConfig.scaler;
        const h = 5*globalConfig.scaler;
        const ix = x*globalConfig.scaler;
        const iy = 12*globalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
      }
      const w = 5*globalConfig.scaler;
      const h = 5*globalConfig.scaler;
      const ix = 15*globalConfig.scaler;
      const iy = 12*globalConfig.scaler;
      p5.image(floorTex, ix, iy, w, h);

      // 4th row
      for(let x = 5; x < 20; x+=5) {
        const w = 5*globalConfig.scaler;
        const h = 5*globalConfig.scaler;
        const ix = x*globalConfig.scaler;
        const iy = 17*globalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
      }
      for(let x = 10; x < 20; x+=5) {
        const w = 5*globalConfig.scaler;
        const h = 5*globalConfig.scaler;
        const ix = x*globalConfig.scaler;
        const iy = 22*globalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
      }

    }
  }


  const rightPatio = (p5, sc=globalConfig.scaler) => {
    const x = 21.5*sc;
    const y = 15.5*sc;
    const w = 5*sc;
    if(grasses[1]) p5.image(grasses[1],x, y, w, w);
  }

  const drawBorderPlants = (p5, sc=globalConfig.scaler) => {
    if (horizPlant) {
      var startY = -horizPlant.height;
      for (let i = 0; i < 4; i++) {
        p5.image(horizPlant, i*horizPlant.width, startY, horizPlant.width, horizPlant.height);
      }
      startY += 5*sc;
      p5.image(horizPlant, 27*sc, startY);
    }

  }

  const drawGrass = (p5, sc=globalConfig.scaler) =>  {
    if (grasses[1]) {
      // for (let x = -15*sc; x < -12*sc; x+= shrub.width) {
      const w = 5;
      const startX = -10;
      const endX = 35;
      const startY = -5;
      const endY = 40;
      for (let x = startX; x < endX; x+= w) {
        for (let y = startY; y< endY; y+= w) {
          if (y > 10)  {
            if (x == y);
            else p5.image(grasses[1], (x-1)*sc, y*sc, w*sc, w*sc);
          }
          else p5.image(grasses[1], x*sc, y*sc, w*sc, w*sc);
        }
      }
    }
  }

  const drawOuterBoundary = (p5, sc=globalConfig.scaler) => {
    if (shrub) {
      // for (let x = -15*sc; x < -12*sc; x+= shrub.width) {
      const startX = -8*sc-shrub.width*2;
      const endX = 35*sc;
      for (let y = -5*sc; y < 40*sc; y+= shrub.height) {
        p5.image(shrub, startX, y);
        p5.image(shrub, startX+shrub.width, y);
        p5.image(shrub, endX, y);
        p5.image(shrub, endX+shrub.width, y);
      }
      const startY = -5*sc-shrub.height*2;
      const endY = 40*sc;
      for (let x = startX+shrub.width*2; x < 35*sc; x+= shrub.width) {
        p5.image(shrub, x, startY);
        p5.image(shrub, x, startY+shrub.height);
        p5.image(shrub, x, endY);
        p5.image(shrub, x, endY+shrub.height);
      }
      // }
    }

  }

  const drawWalls = (p5) => {
    if (walls) {
      let i = 0;
      for (const wall of walls) {
        if (i==0) {
          // p5.fill(200);
          // p5.noStroke();
          // p5.strokeWeight(10);
          // p5.stroke(0);
          // wall.displayShape(p5, floorTex, globalConfig.scaler);

          wall.displayBorder(p5, globalConfig.scaler);
          i++;
        }
        // p5.noFill();
        // p5.strokeWeight(10);
        // p5.stroke(0);
        // wall.displayOutline();
      }
    }
  }

  const drawPlants = (p5) => {
    // if (palm) p5.image(palm, 200, 2500, 250, 250);
    const w = 2*globalConfig.scaler;

    for (let x = 2; x < 14; x++) {
      const dx = x*globalConfig.scaler;
      const dy = 27*globalConfig.scaler;
      // if (x === 10 || x === 15) p5.image(palm, dx, dy, w, w);
      // else if (x == 10)
      // else if (x == 14|| x==16 || x);
      // else
      if (grasses[2]) p5.image(grasses[2], dx, dy, w/2, w/2);
    }

  }

  const drawStairs = (p5) => {
    const w = 2*globalConfig.scaler;
    if (stairs) p5.image(stairs, 21.5*globalConfig.scaler, 15*globalConfig.scaler, w*2, w*2);
    if (stairsBig) p5.image(stairsBig, 11*globalConfig.scaler, 27*globalConfig.scaler, w*4, w*2);
  }

  const drawDanceFloor = (p5) => {
    p5.push();
    p5.translate(2000, -200);
    let spacing = 50;
    p5.noStroke();
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        p5.push();
        p5.translate(x*spacing, y*spacing);
        if ((x%2 === 0 && y%2 === 0) || ((x+1)%2 === 0 && (y+1)%2===0) ) p5.fill(0);
        else p5.fill(255);
        p5.rect(0, 0, spacing, spacing);
        p5.pop();
      }
    }
    // composting - diverting from trash
    p5.pop();
  }

  const drawDoors = (p5) => {
    if (doors) {
      for (const door of doors) {
        door.display(p5);
      }
    }
  }

  const drawRooms = (p5) => {
    if (rooms) {
      for (const room of rooms) {
        room.display(roomTextures, eyeIcon, roomCount);

        // var w = roomConfig.w*wallConfig.scaler;
        // var h = w;
        // // if (room.id === "B") w = 7*wallConfig.scaler;
        // drawRoom(p5, room.x*wallConfig.scaler, room.y*wallConfig.scaler, w, h, room.rot, room.title);
      }
    }

  }

  const doorCrossing = (userStep) => {
    for(const door of doors) {
      const cross = door.doorCrossing(userStep);
      if (cross) return cross;
    }
    return null;
  }


  const roomDoorCrossing = (userStep) => {
    for(const room of rooms) {
      const cross = room.roomDoorCrossing(userStep);
      if (cross) return cross;
    }
    return null;
  }

  const roomBoundary = (userStep) => {
    for(const room of rooms) {
      var cross = room.roomBoundaryCrossing(userStep);
      if (cross) return true;
    }
    return false;
  }

  const wallBoundary = (userStep) => {
    for(const wall of walls) {
      var cross = wall.wallBoundaryCrossing(userStep);
      if (cross) return true;
    }
    return false;
  }



  const userTakeStep = (p5, x, y) => {
    var t =new Date();
    let space = 50;
    const userStep = { ...user }
    userStep.x += x*space;
    userStep.y += y*space;
    const outsideDoor = doorCrossing(userStep);
    const roomDoor = roomDoorCrossing(userStep);
    // check if entering a room door
    // check if crossing into outside
    // check crossed an inside boundary
    // check if crossed a room boundary

    if (roomDoor) {
      props.userNewRoom(roomDoor);
    }
    else if (outsideDoor) {
      props.userMove(userStep.x, userStep.y);
    }
    else if (roomBoundary(userStep)) {}
    else if (wallBoundary(userStep)) {}
    else {
      props.userMove(userStep.x, userStep.y);
    }
    // console.log(new Date() - t);
  }

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} keyPressed={keyPressed} />;
};
