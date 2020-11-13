import React from "react";
import Sketch from "react-p5";

// import {doorCrossing, boundaryCrossing} from './components/Sketch/Boundaries';

import Wall from "./components/Wall";
import Room from "./components/Room";
import Door from "./components/Door";
import MiniMap from "./components/MiniMap";
import { globalConfig, danceFloor, limits } from "../constants";

var walls = [];
var rooms = [];
var doors = [];




var miniMap;


var floorTex;
var palm;
var cloud;
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

  const preload = (p5) => {
    const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/homePage/";
    floorTex = p5.loadImage(url + "concrete-512.jpg");
    palm = p5.loadImage(url + "grass/palm.png");
    cloud = p5.loadImage(url + "cloud.png");

    // stairs = p5.loadImage(url + "grass/stairs.png");
    stairsBig = p5.loadImage(url + "grass/stairsbig.png");
    shrub = p5.loadImage(url + "grass/shrub_sm.jpg");
    // horizPlant = p5.loadImage(url + "grass/seamless_shrub.jpg");
    // grasses[0] = p5.loadImage(url + "grass/100.png");
    // grasses[1] = p5.loadImage(url + "grass/200.png");
    // grasses[2] = p5.loadImage(url + "grass/400.png");
    // grasses[3] = p5.loadImage(url + "grass/1000.png");
    roomTextures[0] = p5.loadImage(url + "rooms/bot.png");
    roomTextures[1] = p5.loadImage(url + "rooms/right.png");
    roomTextures[2] = p5.loadImage(url + "rooms/left.png");
    eyeIcon = p5.loadImage(url + "eye.png")
  }

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    // img = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/jungleGyms/wallpaper3.jpg",
    // img => {p5.image(img, 0, 0);},
    // (err) => { console.log("ERR", err)}


    // const wallpaper = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/jungleGyms/wallpaper3.jpg";
    // const wood = "/assets/s3-bucket/homePage/wood.jpg";
    // const concrete = "/assets/s3-bucket/homePage/concrete.jpg";




    for (let i = 0; i < 2; i++) {
      walls.push(new Wall(p5, i, globalConfig));
    }
    for (let i = 0; i < 13; i++) {
      rooms.push(new Room(p5, i));
    }
    for (let i = 0; i < 4; i++) {
      doors.push(new Door(p5, i, globalConfig));
    }

    // miniMap = new MiniMap(p5, 50, p5.windowHeight - 200 - 80, 200, 200);

    p5.frameRate(20);

    // loadImages()
    // .then(function (allimgs) {
    //   console.log("all promises done");
    //   loading = false;
    // })
    // .catch(function (error) {
    //   console.log('Something went wrong', error);
    // });

    props.loadingDone();
  };



  const draw = (p5) => {
    p5.clear();

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    p5.push();
    p5.translate(-user.x, -user.y);

    // if (img) p5.image(img, 0, 0);

    p5.push();
    p5.translate(globalConfig.x * globalConfig.scaler, globalConfig.y * globalConfig.scaler)


    // rightPatio(p5);

    // ground
    // drawGrass(p5);

    // drawPathFrontDoor(p5);

    // drawStairs(p5);
    // floors
    drawDanceFloor(p5);

    ////// not these
    // drawSpaceFloor(20, 12, 12, 10, p5); // left
    // drawSpaceFloor(5, 27, 20, 8, p5); // bottom
    // drawSpaceFloor(24, 22, 4, 8, p5); // bottom to left
    ////////

    drawFloor(0, 22, 28, 18, false, false, globalConfig.scaler, p5);
    drawFloor(-10, -5, 28, 18, false, false, globalConfig.scaler*4, p5);
    // drawFloor(0, 0, 30, 30, false, false, p5);
    // drawSpaceFloorTriangle(5 - 15, 27 - 15, 5 + 9, 27 + 9, p5);
    // drawSpaceFloorTriangle(15, 27 + 9, 15 + 9, 27, p5);
    let startX = 14;
    let startY = 32;
    let h = 10;
    let w = 15;


    drawSpaceFloorLine(10, 38, 10 + 22, 38 - 22, 14, p5);
    // drawSpaceFloorLine(5, 34+5,10, 34,  5, p5);
    // drawSpaceFloor(0, 32, 10, 7, p5); // dance

    // drawSpaceFloorLine(-25, 0,5, 38,  6, p5);
    // drawSpaceFloor(-8, 0, 8, 12, p5); // top left
    // drawSpaceFloor(20, -7, 15, 12, p5); // dance

    // drawPlants(p5);




    drawGalleryGround(p5);
    // drawGalleryGrid(p5);
    drawGalleryRects(p5);
    // drawBorderPlants(p5);


    // walls
    // p5.noFill();
    p5.stroke(255);
    p5.strokeWeight(2);
    drawWalls(p5);


    // doors
    // drawDoors(p5);



    // drawGrid(p5);

    // rooms
    drawRooms(p5);

    // drawOuterBoundary(p5);

    p5.pop();


    p5.pop();


    p5.stroke(255, 0, 255);
    p5.strokeWeight(2);
    p5.fill(255, 0, 255);
    p5.textSize(50);
    var str = (p5.round(user.x / globalConfig.scaler - globalConfig.x, 1)) + ", " + (p5.round(user.y / globalConfig.scaler - globalConfig.y, 1)) + "";
    // var str = (user.x) + ", " + (user.y) + "";
    // p5.text(str, 0, 0)


    p5.pop();
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


  const drawGrid = (p5) => {
    let spacing = globalConfig.stepS;
    p5.stroke(255, 100);
    p5.strokeWeight(2);
    let sc = globalConfig.scaler;
    for (let x = limits[0].x * sc; x <= limits[1].x * sc; x += spacing) {
      p5.line(x, limits[0].y * sc, x, limits[2].y * sc);
    }

    for (let y = limits[0].y * sc; y <= limits[2].y * sc; y += spacing) {
      p5.line(limits[0].x * sc, y, limits[1].x * sc, y);
    }
  }

  const roundToMult = (num, mult) => {
    let newNum = num + mult / 2; // to round up if necessary
    let diff = newNum % mult;
    return newNum - diff;
  }

  const drawSpaceFloorTriangle = (x0, y0, x1, y1, p5) => {
    let sc = globalConfig.scaler;
    let spacing = globalConfig.stepS;
    x0 = roundToMult(x0 * sc, spacing);
    y0 = roundToMult(y0 * sc, spacing);
    x1 = roundToMult(x1 * sc, spacing);
    y1 = roundToMult(y1 * sc, spacing);

    let yOffset = new Date() / 2000;

    let slope = (y1 - y0) / (x1 - x0);
    let b = y0 - slope * x0;

    p5.stroke(255, 150);
    p5.noStroke();
    p5.strokeWeight(2);
    if (slope >= 0) {
      for (let x = x0; x <= x1; x += spacing) {
        let yVal = slope * x + b;
        let yValRounded = roundToMult(yVal, spacing);
        for (let y = y0; y <= yValRounded; y += spacing) {
          let n = p5.noise(x * .005, y * .005 + yOffset);
          let alpha = p5.map(n, 0, 1, 0, 150);
          p5.fill(255, alpha);
          p5.rect(x, y, spacing, spacing);
        }

      }
    }
    else {
      let index = 0;
      // let yVal = y0;
      // let yValRounded = roundToMult(yVal, spacing);
      for (let x = x0; x <= x1; x += spacing) {
        let yVal = slope * x + b;
        let yValRounded = roundToMult(yVal, spacing);
        for (let y = y1; y <= yValRounded; y += spacing) {
          let n = p5.noise(x * .005, y * .005 + yOffset);
          let alpha = p5.map(n, 0, 1, 0, 150);
          p5.fill(255, alpha);
          p5.rect(x, y, spacing, spacing);
        }
        // console.log(index++, yVal/spacing, yValRounded/spacing);

      }
    }
  }

  const drawSpaceFloorLine = (x0, y0, x1, y1, w, p5) => {
    let sc = globalConfig.scaler;
    let spacing = globalConfig.stepS;
    x0 = roundToMult(x0 * sc, spacing);
    y0 = roundToMult(y0 * sc, spacing);
    x1 = roundToMult(x1 * sc, spacing);
    y1 = roundToMult(y1 * sc, spacing);
    w = roundToMult(w * sc, spacing);
    let yOffset = new Date() / 2000;

    let slope = (y1 - y0) / (x1 - x0);
    let b = y0 - slope * x0;

    p5.stroke(255, 150);
    p5.noStroke();
    p5.strokeWeight(2);
    if (slope >= 0) {
      for (let x = x0; x <= x1; x += spacing) {
        let yVal = slope * x + b;
        let yValRounded = roundToMult(yVal, spacing);
        let yValStart = yValRounded - w;
        for (let y = yValStart; y <= yValRounded; y += spacing) {
          let n = p5.noise(x * .005, y * .005 + yOffset);
          let alpha = p5.map(n, 0, 1, 0, 150);
          p5.fill(255, alpha);
          p5.rect(x, y, spacing, spacing);
        }

      }
    }
    else {
      let index = 0;
      // let yVal = y0;
      // let yValRounded = roundToMult(yVal, spacing);
      for (let x = x0; x <= x1; x += spacing) {
        let yVal = slope * x + b;
        let yValRounded = roundToMult(yVal, spacing);
        let yValStart = yValRounded - w;
        for (let y = yValStart; y <= yValRounded; y += spacing) {
          let n = p5.noise(x * .005, y * .005 + yOffset);
          let alpha = p5.map(n, 0, 1, 0, 150);
          p5.fill(255, alpha);
          p5.rect(x, y, spacing, spacing);
        }
        // console.log(index++, yVal/spacing, yValRounded/spacing);

      }
    }
  }

  // p5.fill(255, 50);
  // p5.rect(-12*sc, -10*sc, (38+12)*sc, (40+10)*sc);


  const drawSpaceFloor = (x0, y0, w, h, p5) => {
    let spacing = globalConfig.stepS;
    let yOffset = new Date() / 2000;
    // let bound = 5000;

    let sc = globalConfig.scaler;
    for (let x = x0 * sc; x < (x0 + w) * sc; x += spacing) {
      for (let y = y0 * sc; y < (y0 + h) * sc; y += spacing) {
        let n = p5.noise(x * .005, y * .005 + yOffset);
        let alpha = p5.map(n, 0, 1, 0, 150);
        p5.fill(255, alpha);
        p5.rect(x, y, spacing, spacing);
      }
    }

    // p5.fill(255, 50);
    // p5.rect(-12*sc, -10*sc, (38+12)*sc, (40+10)*sc);

  }

  const drawFloor = (x0, y0, w, h, isCheckered, isFilled, spacing, p5) => {
    // let spacing = globalConfig.stepS;
    let yOffset = new Date() / 2000;
    // let bound = 5000;
    p5.noFill();

  

    let sc = globalConfig.scaler;
    let xInd = 0;
    let yInd = 0;
    for (let x = x0 * sc; x < (x0 + w) * sc; x += spacing) {
      for (let y = y0 * sc; y < (y0 + h) * sc; y += spacing) {
        let alpha = 255;
        if (isFilled) {
          // if (isCheckered) alpha = ((xInd + yInd) % 2 == 0) ? 200 : 50;
          alpha = p5.map(Math.sin(new Date()/1000 + x/100 + y/200), -1, 1, 0, 110);
          p5.fill(255, alpha);
        } else {
          // alpha = p5.map(Math.sin(new Date()/1000 + x/100 + y/200), -1, 1, 0, 180);
          p5.stroke(255, alpha);
        }
        p5.rect(x, y, spacing, spacing);
        yInd++;
      }
      xInd++;
    }

    // p5.fill(255, 50);
    // p5.rect(-12*sc, -10*sc, (38+12)*sc, (40+10)*sc);

  }


  const drawDanceFloor = (p5) => {
    let sc = globalConfig.scaler;
    let spacing = 60;
    let w = 10 * 70;
    let h = 5 * 70;

    p5.noStroke();
    let alpha = p5.map(Math.sin(new Date() / 500), -1, 1, 150, 255);
    p5.fill(255, alpha);
    for (let x = danceFloor.x; x < (danceFloor.x + w); x += spacing) {
      for (let y = danceFloor.y; y < (danceFloor.y + h); y += spacing) {

        // p5.line(, y, bound, y);
        p5.rect(x, y, 50, 50);
      }
    }
  }

  const drawGalleryGround = (p5) => {
    if (floorTex) {
      // 1st
      for (let x = 0; x < 20; x += 5) {
        const w = 5 * globalConfig.scaler;
        const h = 5 * globalConfig.scaler;
        const ix = x * globalConfig.scaler;
        const iy = 2 * globalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
      }
      // 2nd
      for (let x = 0; x < 30; x += 5) {
        const w = 5 * globalConfig.scaler;
        const h = 5 * globalConfig.scaler;
        const ix = x * globalConfig.scaler;
        const iy = 5 * globalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
      }

      // 3rd
      for (let x = 0; x < 30; x += 5) {
        const w = 5 * globalConfig.scaler;
        const h = 5 * globalConfig.scaler;
        const ix = x * globalConfig.scaler;
        const iy = 10 * globalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
      }
      // 4th row
      for (let x = 0; x < 15; x += 5) {
        const w = 5 * globalConfig.scaler;
        const h = 5 * globalConfig.scaler;
        const ix = x * globalConfig.scaler;
        const iy = 12 * globalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
      }
      const w = 5 * globalConfig.scaler;
      const h = 5 * globalConfig.scaler;
      const ix = 15 * globalConfig.scaler;
      const iy = 12 * globalConfig.scaler;
      p5.image(floorTex, ix, iy, w, h);

      // 4th row
      for (let x = 5; x < 20; x += 5) {
        const w = 5 * globalConfig.scaler;
        const h = 5 * globalConfig.scaler;
        const ix = x * globalConfig.scaler;
        const iy = 17 * globalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
      }
      for (let x = 10; x < 20; x += 5) {
        const w = 5 * globalConfig.scaler;
        const h = 5 * globalConfig.scaler;
        const ix = x * globalConfig.scaler;
        const iy = 22 * globalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
      }

    }
  }

  const drawGalleryGrid = (p5) => {
    // 1st
    p5.stroke(255, 100);
    p5.strokeWeight(2);
    let sc = globalConfig.scaler;
    let step = 1;
    for (let x = 0; x < 27; x += step) {
      const y0 = 5;
      const y1 = 15;
      p5.line(x * sc, y0 * sc, x * sc, y1 * sc);
    }
    for (let y = 5; y < 15; y += step) {
      const x0 = 0;
      const x1 = 27;
      p5.line(x0 * sc, y * sc, x1 * sc, y * sc);
    }
    // 2nd
    for (let x = 0; x < 20; x += step) {
      const y0 = 15;
      const y1 = 22;
      p5.line(x * sc, y0 * sc, x * sc, y1 * sc);
    }
    for (let y = 15; y < 22; y += step) {
      const x0 = 0;
      const x1 = 20;
      p5.line(x0 * sc, y * sc, x1 * sc, y * sc);
    }

    // 3rd
    for (let x = 10; x < 20; x += step) {
      const y0 = 22;
      const y1 = 27;
      p5.line(x * sc, y0 * sc, x * sc, y1 * sc);
    }
    for (let y = 22; y < 27; y += step) {
      const x0 = 10;
      const x1 = 20;
      p5.line(x0 * sc, y * sc, x1 * sc, y * sc);
    }

  }

  const drawGalleryRects = (p5) => {
    let yind = 0;
    let xind = 0;
    let cFilled = p5.color(255, 200);
    let cDark = p5.color(255, 50);

    p5.strokeWeight(2);
    p5.stroke(255, 150);
    let sc = globalConfig.scaler;
    let step = 1;
    for (let x = 0; x < 27; x += step) {
      for (let y = 5; y < 15; y += step) {
        if ((yind + xind) % 2 == 0) p5.fill(cDark);
        else p5.fill(cFilled);
        p5.rect(x * sc, y * sc, sc, sc);
        yind++;
      }
      xind++;
    }

    // 2nd
    for (let x = 0; x < 20; x += step) {
      for (let y = 15; y < 22; y += step) {
        if ((x + y + 1) % 2 == 0) p5.fill(cDark);
        else p5.fill(cFilled);
        p5.rect(x * sc, y * sc, sc, sc);
      }
    }



    // 3rd
    yind = 0;
    xind = 0;
    for (let x = 10; x < 20; x += step) {
      for (let y = 22; y < 27; y += step) {
        if ((x + y + 1) % 2 == 0) p5.fill(cDark);
        else p5.fill(cFilled);
        p5.rect(x * sc, y * sc, sc, sc);
      }
    }


  }

  const rightPatio = (p5, sc = globalConfig.scaler) => {
    const x = 21.5 * sc;
    const y = 15.5 * sc;
    const w = 5 * sc;
    if (grasses[1]) p5.image(grasses[1], x, y, w, w);
  }

  const drawBorderPlants = (p5, sc = globalConfig.scaler) => {
    if (horizPlant) {
      var startY = -horizPlant.height;
      for (let i = 0; i < 4; i++) {
        p5.image(horizPlant, i * horizPlant.width, startY, horizPlant.width, horizPlant.height);
      }
      startY += 5 * sc;
      p5.image(horizPlant, 27 * sc, startY);
    }

  }

  const drawGrass = (p5, sc = globalConfig.scaler) => {
    if (grasses[1]) {
      // for (let x = -15*sc; x < -12*sc; x+= shrub.width) {
      const w = 5;
      const startX = -10;
      const endX = 35;
      const startY = -5;
      const endY = 40;
      for (let x = startX; x < endX; x += w) {
        for (let y = startY; y < endY; y += w) {
          if (y > 10) {
            if (x == y);
            else p5.image(grasses[1], (x - 1) * sc, y * sc, w * sc, w * sc);
          }
          else p5.image(grasses[1], x * sc, y * sc, w * sc, w * sc);
        }
      }
    }
  }

  const drawOuterBoundary = (p5, sc = globalConfig.scaler) => {
    const startX = limits[0].x * sc;
    const endX = limits[1].x * sc;


    const startY = limits[0].y * sc;
    const endY = limits[2].y * sc;

    const barW = (endX - startX);
    const barH = (endY - startY);

    // p5.fill(0, 180);
    // p5.noStroke();
    p5.noFill();
    p5.stroke(0);
    p5.strokeWeight(2);
    p5.rect(startX - barW, startY, barW, barH);
    p5.rect(endX, startY, barW, barH);

    p5.rect(startX - barW, startY - 2000, endX - startX + 2 * barW, 2000);
    p5.rect(startX - barW, endY, endX - startX + 2 * barW, 2000);


    // if (shrub) {
    //   // vert
    //   for (let y = startY; y < endY; y += shrub.height) {
    //     p5.image(shrub, startX-shrub.width*2, y);
    //     p5.image(shrub, startX-shrub.width, y);
    //     p5.image(shrub, endX, y);
    //     p5.image(shrub, endX + shrub.width, y);
    //   }
    //   for (let x = startX - shrub.width; x < endX+ shrub.width; x += shrub.width) {
    //     p5.image(shrub, x, startY-2*shrub.height);
    //     p5.image(shrub, x, startY - shrub.height);
    //     p5.image(shrub, x, endY);
    //     p5.image(shrub, x, endY + shrub.height);
    //   }
    // }

  }

  const drawWalls = (p5) => {
    if (walls) {
      let i = 0;
      for (const wall of walls) {
        if (i == 0) {
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
    let sc = globalConfig.scaler;
    if (palm) p5.image(palm, 0, 30 * sc, 50 * 4, 50 * 4);
    // const w = 2 * ;

    // for (let x = 2; x < 14; x++) {
    //   const dx = x * globalConfig.scaler;
    //   const dy = 27 * globalConfig.scaler;
    //   // if (x === 10 || x === 15) p5.image(palm, dx, dy, w, w);
    //   // else if (x == 10)
    //   // else if (x == 14|| x==16 || x);
    //   // else
    //   if (grasses[2]) p5.image(grasses[2], dx, dy, w / 2, w / 2);
    // }

  }

  const drawPathFrontDoor = (p5) => {
    let { scaler } = globalConfig;

    // right
    // let x0 = 15*scaler;
    // let y0 = 25*scaler;
    // let h = 400;
    // let w = 120;
    // for (let x = x0; x < x0+w; x+= 50) {
    //   for (let y = y0; y < y0+h; y+= 50) {
    //     p5.fill(255);
    //     p5.rect(x, y, 50, 50);
    //   }
    // }

    // // left
    // x0 = 12.5*scaler;
    // for (let x = x0; x < x0+w; x+= 50) {
    //   for (let y = y0; y < y0+h; y+= 50) {
    //     p5.fill(255, 0, 255);
    //     p5.rect(x, y, 50, 50);
    //   }
    // }

    const points = [

      // left
      { x: 15 * scaler, y: 28 * scaler },
      { x: 15 * scaler, y: 32 * scaler },
      { x: 6.5 * scaler, y: 32 * scaler },
      { x: -7 * scaler, y: 17 * scaler },
      // right
      // 12.5 = left
      // { x: 17.5 * scaler, y: 28 * scaler },
      // { x: 17.5 * scaler, y: 32 * scaler },

    ]

    p5.stroke(255, 150);
    p5.strokeWeight(300);
    for (let i = 0; i < points.length - 1; i++) {
      let p0 = points[i];
      let p1 = points[i + 1];
      p5.line(p0.x, p0.y, p1.x, p1.y);

    }
  }

  const drawStairs = (p5) => {
    const w = 8 * globalConfig.scaler;
    const h = 3 * globalConfig.scaler;
    if (stairs) p5.image(stairs, 21.5 * globalConfig.scaler, 15 * globalConfig.scaler, w * 2, w * 2);
    if (stairsBig) p5.image(stairsBig, 11 * globalConfig.scaler, 27 * globalConfig.scaler, w, h);
  }

  const drawDoors = (p5) => {
    p5.strokeWeight(4);
    p5.fill(0);
    p5.stroke(80);
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

  const doorCrossing = (prevStop, userStep) => {
    for (const door of doors) {
      const cross = door.doorCrossing(prevStop, userStep);
      if (cross) return cross;
    }
    return null;
  }


  const roomDoorCrossing = (prevStep, userStep) => {
    for (const room of rooms) {
      const cross = room.roomDoorCrossing(prevStep, userStep, 1);
      if (cross) return cross;
    }
    return null;
  }

  const roomDoorEntryCrossing = (prevStep, userStep) => {
    for (const room of rooms) {
      const cross = room.roomDoorEntryCrossing(prevStep, userStep);
      if (cross) return cross;
    }
    return null;
  }

  const roomDoorBoundary = (prevStep, userStep) => {
    for (const room of rooms) {
      const cross = room.roomDoorBoundary(prevStep, userStep);
      if (cross) return cross;
    }
    return null;
  }

  const roomBoundary = (prevStep, userStep) => {

    for (const room of rooms) {
      var cross = room.roomBoundaryCrossing(prevStep, userStep);
      if (cross) return true;
    }
    return false;
  }

  const wallBoundary = (prevStep, userStep) => {
    for (const wall of walls) {
      var cross = wall.wallBoundaryCrossing(prevStep, userStep);
      if (cross) return true;
    }
    return false;
  }



  const userTakeStep = (p5, x, y) => {
    var t = new Date();
    let space = globalConfig.stepS;
    const prevStep = { x: user.x, y: user.y }
    const userStep = { x: user.x + x * space, y: user.y + y * space };
    const outsideDoor = doorCrossing(prevStep, userStep);
    const roomDoorEntry = roomDoorEntryCrossing(prevStep, userStep);
    const roomDoor = roomDoorCrossing(prevStep, userStep);
    const roomDoorB = roomDoorBoundary(prevStep, userStep);
    // check if entering a room door
    // check if crossing into outside
    // check crossed an inside boundary
    // check if crossed a room boundary

    if (roomDoor) {
      props.userNewRoom(roomDoor);
      // console.log("entering room", roomDoor);
    }
    else if (outsideDoor) {
      props.userMove(userStep.x, userStep.y);
      // console.log("outside door")
    }
    else if (roomDoorEntry) {
      props.userMove(userStep.x, userStep.y);
      // console.log("enter/exit room")
    }
    else if (roomBoundary(prevStep, userStep)) {
      // console.log("room boundary")
    }
    else if (roomDoorB) {
      // console.log("room door boundary")
    }
    else if (wallBoundary(prevStep, userStep)) {
      // console.log("wall boundary")
    }
    else {
      props.userMove(userStep.x, userStep.y);
    }
    // console.log(new Date() - t);
  }

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }

  return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} keyPressed={keyPressed} />;
};
