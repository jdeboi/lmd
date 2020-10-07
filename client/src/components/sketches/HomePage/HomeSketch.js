import React from "react";
import Sketch from "react-p5";
import {doorCrossing, boundaryCrossing, userNearWine} from './components/Boundaries';

var floorTex;
var roomTex;
// var windowW = window.innerWidth;
// var windowH = window.innerHeight;

const wallConfig = {
  scaler: 60,
  minX: 0,
  maxX: 27,
  minY: 5,
  maxY: 27
}

wallConfig.x = -15;
wallConfig.y = -35;

const centerW = 1000;
var miniMap;
var walls = [
  {x: 0, y: 5},
  {x: 27, y: 5},
  {x: 27, y: 15},
  {x: 20, y: 15},
  {x: 20, y: 27},
  {x: 10, y: 27},
  {x: 10, y: 22},
  {x: 0, y: 22},
  {x: 0, y: 5}
];
var rooms = [
  {id: "B", title: "bathroom", x: -5, y: 10, rot: -90},
  {id: 0, title: "gift-shop", x: 20, y: 22, rot: 90},
  {id: 1, title: "macbook-air", x: 5, y: 22, rot: 270},
  {id: 2, title: "wet-streams", x: 12, y: 13, rot: 0},
  {id: 3, title: "hard-drives-on-seashores", x: 12, y: 8, rot: -90},
  {id: 4, title: "jungle-gyms", x: 7, y: 8, rot: 90},
  {id: 5, title: "wasted-days-are-days-wasted", x: 0, y: 17, rot: -90},
  {id: 6, title: "esc-to-mars", x: 0, y: 0, rot: 0},
  {id: 7, title: "xfinity-depths", x: 5, y: 0, rot: 0},
  {id: 8, title: "cloud-confessional", x: 10, y: 0, rot: 0},
  {id: 9, title: "same-storm-different-boat", x: 15, y: 0, rot: 0},
  {id: 10, title: "tbd", x: 20, y: 0, rot: 0},
  {id: 11, title: "tbd", x: 27, y: 5, rot: 90},
  {id: 12, title: "tbd", x: 27, y: 10, rot: 90}
];

var doors = [
  {x0: 25 , y0: 5, x1: 27, y1: 5, to:"outside"}, // top
  {x0: 0 , y0: 5, x1: 0, y1: 10, to:"outside"}, // left
  {x0: 12 , y0: 27, x1: 18, y1: 27, to:"outside"}, // bottom
  {x0: 21 , y0: 15, x1: 26, y1: 15, to:"outside"}, // right
];

//    {x0: 0 , y0: 200, x1: 200, y1: 200, to:"/wet-streams"}


export default (props) => {
  let x = 50;
  const y = 50;
  const user = props.user;
  const users = props.users;


  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL).parent(canvasParentRef);
    // img = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/jungleGyms/wallpaper3.jpg",
    // img => {p5.image(img, 0, 0);},
    // (err) => { console.log("ERR", err)}

    const wallpaper = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/jungleGyms/wallpaper3.jpg";
    const wood = "/assets/s3-bucket/homePage/wood-256.jpg";
    floorTex = p5.loadImage(wood);
    roomTex = p5.loadImage("/assets/s3-bucket/homePage/cube.png")

    miniMap = p5.createGraphics(200, 200);
  };

  const draw = (p5) => {
    p5.clear();

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes

    p5.push();
    p5.translate(-user.x, -user.y);
    // p5.translate(p5.windowWidth/2, p5.windowHeight/2);
    // if (img) p5.image(img, 0, 0);

    p5.push();
    p5.translate(wallConfig.x*wallConfig.scaler, wallConfig.y*wallConfig.scaler)
    drawWalls(p5);
    drawRooms(p5);

    p5.strokeWeight(10);
    p5.fill(255, 0, 0);
    p5.stroke(255, 0, 0);
    drawDoors(p5);
    p5.pop();



    p5.pop();

    drawMiniMap(p5);

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

  const drawRooms = (p5) => {
    for (const room of rooms) {
      var w = 5*wallConfig.scaler;
      var h = w;
      if (room.id === "B") h = 7*wallConfig.scaler;
      drawRoom(p5, room.x*wallConfig.scaler, room.y*wallConfig.scaler, w, h, 0);
    }
  }

  const drawRoom = (p5, x, y, w, h, deg) => {
    p5.push();
    p5.translate(x, y);
    // let rad = deg/180*p5.PI;
    // p5.rotateZ(rad);
    // p5.translate(-w*p5.cos(rad), -h*p5.sin(rad));
    p5.image(roomTex, 0, 0, w, h);
    p5.pop();
  }

  const outlineRooms = (p5, scaler=wallConfig.scaler) => {
    for (let i = 0; i < rooms.length; i++) {
      var w = 5*scaler;
      var h = 5*scaler;
      if (rooms[i].id === "B") h = 7*scaler;
      p5.push();
      p5.translate(rooms[i].x*scaler, rooms[i].y*scaler);
      p5.rect(0, 0, w, h);

      // label
      // p5.strokeWeight(1);
      // p5.fill(255, 0, 255);
      // p5.text(rooms[i].id, 10, 0)
      p5.pop();
    }
  }

  const drawRoomDoors = (p5, scaler=wallConfig.scaler) => {
    for (let i = 0; i < rooms.length; i++) {
      var w = 5*scaler;
      var h = 5*scaler;
      if (rooms[i].id === "B") h = 7*scaler;
      p5.push();
      p5.translate(rooms[i].x*scaler, rooms[i].y*scaler);
      p5.translate(w/2, h/2);
      p5.rotate(rooms[i].rot/180*Math.PI);
      // p5.translate(-w/2, -h/2);
      if (rooms[i].id ==="B") p5.line(-h*.25, w/2, h*.25, w/2);
      else p5.line(-w*.25, h/2, w*.25, h/2);
      p5.pop();
    }
  }

  const userTakeStep = (p5, x, y) => {
    let space = 50;
    const userStep = { ...user }
    userStep.x += x*space;
    userStep.y += y*space;
    const room = doorCrossing(userStep, doors, wallConfig);
    if (room) {
      if (room !== "outside") props.userNewRoom(room);
      alert(room);
    }
    // else if (boundaryCrossing(userStep, walls, wallConfig)) {
    //   // alert("boundary crossing");
    // }
    else {
      props.userMove(userStep.x, userStep.y);
    }

  }

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }



  const drawWalls = (p5, sc=wallConfig.scaler) => {
    if (walls) {
      p5.noFill();
      p5.stroke(255);
      p5.strokeWeight(10);
      p5.beginShape();
      // p5.textureWrap(p5.REPEAT);
      // p5.texture(floorTex);
      // p5.vertex(0, 0, 0, 0);
      // p5.vertex(200, 0, 200, 0);
      // p5.vertex(200, 200, 200, 200);
      // p5.vertex(0, 200, 0, 200);
      for (let i = 0; i < walls.length; i++) {
        // const uv = getWallUV(p5, walls[i].x, walls[i].y);
        p5.vertex(walls[i].x*sc, walls[i].y*sc);
      }
      p5.endShape();


    }

  }

  const drawBoundaries = (p5, sc=wallConfig.scaler) => {
    // lines
    for (let i = 0; i < walls.length-1; i++) {
      p5.line(walls[i].x*sc, walls[i].y*sc, walls[i+1].x*sc, walls[i+1].y*sc);
    }

  }

  const getWallUV = (p5, x, y) => {
    const uv = {};

    uv.u = p5.map(x, 0, wallConfig.minX, wallConfig.maxX, 0, 1);
    uv.v = p5.map(y, 0, wallConfig.minY, wallConfig.maxY, 0, 1);
    return uv;
  }

  const drawDoors = (p5, scaler=wallConfig.scaler) => {
    if (doors) {
      for (let i = 0; i < doors.length; i++) {
        p5.line(doors[i].x0*scaler, doors[i].y0*scaler, doors[i].x1*scaler, doors[i].y1*scaler);
      }
    }
  }

  const drawMiniMap = (p5) => {
    var miniMapScaler = 4;
    var x = p5.windowWidth/2 - miniMap.width - 50;
    var y = p5.windowHeight/2 - miniMap.height - 50;
    miniMap.background(0);
    miniMap.push();
    miniMap.translate(20, 20); //-user.x/wallConfig.scaler*miniMapScaler, -user.y/wallConfig.scaler*miniMapScaler);
    miniMap.translate(0, 0); //wallConfig.x*miniMapScaler, wallConfig.y*miniMapScaler)
    miniMap.stroke(255);
    miniMap.strokeWeight(2);
    miniMap.fill(100);
    outlineRooms(miniMap, miniMapScaler);
    drawBoundaries(miniMap, miniMapScaler);
    miniMap.stroke(255, 0, 0);
    drawDoors(miniMap, miniMapScaler);

    miniMap.stroke(0, 0, 255);
    drawRoomDoors(miniMap, miniMapScaler);

    miniMap.stroke(0);
    miniMap.strokeWeight(1);
    miniMap.fill(255, 0, 0);
    const ux = (user.x/wallConfig.scaler-wallConfig.x)*miniMapScaler;
    const uy = (user.y/wallConfig.scaler-wallConfig.y)*miniMapScaler;
    miniMap.ellipse(ux, uy, 10)
    miniMap.pop();

    p5.push();
    p5.translate(x, y);
    p5.image(miniMap, 0, 0);
    p5.strokeWeight(3);
    p5.stroke(255, 0, 0);
    p5.noFill();
    p5.rect(0, 0, miniMap.width, miniMap.height);
    p5.pop();
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} keyPressed={keyPressed} />;
};
