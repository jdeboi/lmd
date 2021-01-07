import React from "react";
import Sketch from "react-p5";
// HELPERS
import { doorCrossing, roomDoorCrossing, roomDoorEntryCrossing, roomDoorBoundary, roomBoundary, wallBoundary } from './functions/crossing';
import { roundToMult2 } from './functions/round';
import { drawAllFloors } from './functions/floor';
import { drawWalls, drawRooms } from './functions/building';
import { displayDancers, updateDucks } from './functions/emojis';
import { reachedDestination, getNextStep, showMouseLoc, showUserEllipses, showDestination, mouseDidMove, drawTextLoc } from './functions/destination';
import { drawUser, drawUsers, checkUserClicked, seeUserClicked } from './functions/users';
import { drawPlantRow, drawGrassPatch } from './functions/garden';
import { addSwingDivs, displaySwingDivs, displayOakDivs, displayTreeDivs, displayBarDivs, displayTrashDivs, checkTrashDivsDouble, addTrashDivs, displayRoomLabelDivs, addDoorDivs, addLightDivs, addColumnDivs, addTreeDivs, addBarDivs, addOakDivs, addFolderDivs, displayDoorDivs, displayLightDivs, displayColumnDivs, displayDivs, endDivDrag, updateDivs, checkDivPress, displayFolderDivs, checkFolderDivsDouble, addRoomLabelDivs } from './functions/divs';
import TreeSlider from './components/TreeSlider';

// COMPONENTS
import Wall from "./components/Wall";
import Room from "./components/Room";


// import Garden from './components/Garden';
import Duck from './components/Duck';
import Dancer from './components/Dancer';


// import MiniMap from "./components/MiniMap";
import { globalConfig } from "../constants";

// BUILDING
var walls = [];
var rooms = [];
var roomTextures = [];
var eyeIcon;
var doors = [];
var doorImgs = [];
// var lights = [];
var lightImgs = [];
// var columns = [];
var floorTex;
// var folders = [];
// var roomLabels = [];
// var ivies = [];
// var poolImg;

// var trashCans = [];
var trashFiles =[];
var flowerRow;
// var garden;
// var grass0;
// var grass1;
var shrub;
var treeSlider;

// EMOJIS
var ducks = [];
var duckImg;
var dancers = [];
var dancerImgs = [];
var baby;


var dogica;

// DRAGGABLE
var divs = {};
var columns = [];
var tree, columnGif, oakImg, txtFile, instaImg;

// var miniMap;


var palm;
var cloud;
// var stairs, stairsBig;
// var horizPlant, shrub;
// var grasses = [];





// MOVEMENT
var isWalking = false;
var stepTo = { x: 0, y: 0 };
var userEase = { x: 0, y: 0 };
var destination = { x: null, y: null, time: null };
var lastMouseMove = 0;

var user, users, roomCount, isMobile;





export default (props) => {
  user = props.user;
  users = props.users;
  isMobile = props.isMobile;
  // const users = props.users;
  roomCount = props.roomCount;

  const preload = (p5) => {
    const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/";


    // stairs = p5.loadImage(url + "grass/stairs.png");
    // stairsBig = p5.loadImage(url + "grass/stairsbig.png");
    // shrub = p5.loadImage(url + "grass/shrub_sm.jpg");
    // horizPlant = p5.loadImage(url + "grass/seamless_shrub.jpg");
    // grasses[0] = p5.loadImage(url + "grass/100.png");
    // grasses[1] = p5.loadImage(url + "grass/200.png");
    // grasses[2] = p5.loadImage(url + "grass/400.png");
    // grasses[3] = p5.loadImage(url + "grass/1000.png");


    // palm = p5.loadImage(url + "grass/palm.png");
    // cloud = p5.loadImage(url + "cloud.png");

    floorTex = p5.loadImage(url + "concrete-512.jpg");
    doorImgs[0] = p5.loadImage(url + "door/frame2.png");
    doorImgs[1] = p5.loadImage(url + "door/leftdoor2.png");
    roomTextures[0] = p5.loadImage(url + "rooms/bot.png");
    roomTextures[1] = p5.loadImage(url + "rooms/right.png");
    roomTextures[2] = p5.loadImage(url + "rooms/left.png");
    eyeIcon = p5.loadImage(url + "eye.png")

    lightImgs[0] = p5.loadImage(url + "tracklights/tracklights_vert.jpg");
    lightImgs[1] = p5.loadImage("/assets/s3-bucket/homePage/light_shadow.png");
    lightImgs[2] = p5.loadImage(url + "tracklights/tracklights_dark_vert.jpg");
    lightImgs[3] = p5.loadImage("/assets/s3-bucket/homePage/black_shadow.png");

    tree = p5.loadImage(url + "grass/tree.png");
    // columnGif = p5.loadImage(url + "column.gif");
    columnGif = p5.loadGif("/assets/column.gif"); //url + "column.gif");

    duckImg = p5.loadImage(url + "duck.png");
    dancerImgs[0] = p5.loadImage(url + "dancers/dancer0.png");
    dancerImgs[1] = p5.loadImage(url + "dancers/dancer1.png");
    dancerImgs[2] = p5.loadImage(url + "dancers/dancer2.png");


    // poolImg = p5.loadImage(url + "waves.gif"); 
    shrub = p5.loadImage("/assets/s3-bucket/homePage/grass/ivory.png");
    // grass0 = p5.loadImage("/assets/s3-bucket/homePage/grass/test/200_fern.png");
    // grass1 = p5.loadImage("/assets/s3-bucket/homePage/grass/test/400.png");
    flowerRow = p5.loadImage("/assets/s3-bucket/homePage/grass/test/cac3.png")

    // shrub = p5.loadImage("/assets/s3-bucket/homePage/grass/test/200_fern.png");
    oakImg = p5.loadImage(url + "grass/oak.png");
    dogica = p5.loadFont(url + "fonts/dogica.ttf");

    txtFile = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/txt.png");
    instaImg = p5.loadImage(url + "instagram.png");
    // garden = new Garden(p5);

    trashFiles[0] = p5.loadImage("/assets/s3-bucket/homePage/trash/fullrec.png")
    trashFiles[3] = p5.loadImage("/assets/s3-bucket/homePage/trash/trash0.png")
    trashFiles[2] = p5.loadImage("/assets/s3-bucket/homePage/trash/trash1.png")
    trashFiles[1] = p5.loadImage("/assets/s3-bucket/homePage/trash/trash2.png")

    baby = p5.loadImage("/assets/s3-bucket/homePage/swing/baby.png");
  }


  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => triggerMove(props.setUserActive, p5));

    let sc = globalConfig.scaler;
    // ivies = [[]]
    // for (let x = 0; x < 5; x++) {
    //   for (let y = 0; y < 5; y++) {
    //     ivies[y][x] = p5.shrub.get(x * sc, y * sc, sc, sc);
    //   }
    // }


    for (let i = 0; i < 2; i++) {
      walls.push(new Wall(p5, i, globalConfig));
    }
    for (let i = 0; i < 13; i++) {
      rooms.push(new Room(p5, i));
    }

    for (let i = 0; i < 5; i++) {
      ducks.push(new Duck(p5, 300, 2200, duckImg));
    }

    dancers[0] = new Dancer(p5, dancerImgs[0], 10, 160, false);
    dancers[1] = new Dancer(p5, dancerImgs[1], 200, 380, false);
    dancers[2] = new Dancer(p5, dancerImgs[2], 300, 150, true);


    // miniMap = new MiniMap(p5, 50, p5.windowHeight - 200 - 80, 200, 200);


    initDivs(p5);
    treeSlider = new TreeSlider(31, 40, 2);
   

    stepTo = { x: user.x, y: user.y };

    p5.frameRate(20);
    props.loadingDone();

    p5.textFont(dogica, 14);

  };


  const initDivs = (p5) => {


    addOakDivs(divs, oakImg, p5);
    addDoorDivs(divs, doors, doorImgs, p5);
    addLightDivs(divs, lightImgs, p5);
    addColumnDivs(divs, columnGif, lightImgs[3], p5);
    addTreeDivs(divs, tree, p5);


    addBarDivs(divs, lightImgs[3], p5);
    
    addTrashDivs(divs, trashFiles, lightImgs[3], p5);


    addFolderDivs(divs, instaImg, txtFile, p5);
    addRoomLabelDivs(divs, eyeIcon, p5);

    addSwingDivs(divs, baby, null, p5);
   
  }








  const drawTest = (p5) => {
    p5.clear();

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    p5.push();
    // p5.translate(-user.x, -user.y);
    p5.translate(-userEase.x, -userEase.y);

    // if (img) p5.image(img, 0, 0);

    p5.push();
    p5.translate(globalConfig.x * globalConfig.scaler, globalConfig.y * globalConfig.scaler)

    p5.rect(0, 0, 2000, 1000);

    p5.pop();
    p5.pop();
    p5.pop();

    mouseStep();
    updateUserEase(p5);
  }

  const draw = (p5) => {
    p5.clear();

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    p5.push();
    // p5.translate(-user.x, -user.y);
    p5.translate(-userEase.x, -userEase.y);

    // if (img) p5.image(img, 0, 0);

    p5.push();
    p5.translate(globalConfig.x * globalConfig.scaler, globalConfig.y * globalConfig.scaler)

    // drawPools(poolImg, p5);

    

    drawAllFloors(floorTex, p5);
    drawGrassPatch(shrub, shrub, p5);

    drawPlantRow(-5, 17, 1, 1, flowerRow, p5);
    drawPlantRow(0, 22, 1, 1, flowerRow, p5);
    drawPlantRow(5, 27, 1, 1, flowerRow, p5);

    drawPlantRow(20, 21, 1, 1, flowerRow, p5);
    drawPlantRow(27, 15, 1, 1, flowerRow, p5);

    // drawPlantRow(-10, -3, 9, 1, flowerRow, p5);
    // drawShrubPatch(shrub, p5);

    drawWalls(walls, p5);
    drawRooms(rooms, roomTextures, eyeIcon, roomCount, p5);
    displayRoomLabelDivs(dogica, roomCount, userEase.x, userEase.y, divs);
    
    // drawOuterBoundary(p5);

    // garden.display(p5);

    
    displayDancers(dancers);
    updateDucks(user.hasCheese, userEase.x, userEase.y, ducks);
    displayOakDivs(userEase.x, userEase.y, divs);

    p5.textFont(dogica, 10);
    displaySwingDivs(userEase.x, userEase.y, divs);

    // seeUserClicked(userEase, users, p5)

    p5.pop();
    p5.pop();
    p5.pop();


    // drawTextLoc(p5);
    mouseStep();
    showTarget(p5);

    drawOverTarget(p5);

    drawUser(user, p5);
    drawOverUser(p5);

    updateDivs(userEase, users, doors, divs);
    treeSlider.update(p5);
    updateUserEase(p5);

  };
  

  const drawOverTarget = (p5) => {
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.translate(-userEase.x, -userEase.y);
    p5.translate(globalConfig.x * globalConfig.scaler, globalConfig.y * globalConfig.scaler)

    // p5.textFont(dogica, 12);
    // displayFolderDivs(divs);
    // displayTrashDivs(userEase.x, userEase.y, divs);
    
  
    drawUsers(userEase, users, dogica, p5);
    

    p5.pop();
  }



  const drawOverUser = (p5) => {
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.translate(-userEase.x, -userEase.y);
    p5.translate(globalConfig.x * globalConfig.scaler, globalConfig.y * globalConfig.scaler)

    // displayDivs(userEase.x, userEase.y, divs);
    displayDoorDivs(userEase.x, userEase.y, divs);
    displayBarDivs(userEase.x, userEase.y, divs);
    displayTreeDivs(userEase.x, userEase.y, treeSlider.getValue(p5), divs);
 
    displayLightDivs(userEase.x, userEase.y, divs);
    displayColumnDivs(userEase.x, userEase.y, divs);
    
    p5.textFont(dogica, 12);
    displayFolderDivs(divs);
    displayTrashDivs(userEase.x, userEase.y, divs);
    
    
    treeSlider.display(p5);

    p5.pop();
  }
  ////////////////////////////////////////////////////////////////////////
  // MOVEMENT
  ////////////////////////////////////////////////////////////////////////
  const showTarget = (p5) => {
    showDestination(userEase, destination, isWalking, p5);
    showUserEllipses(userEase, destination, isWalking, p5);

    if (mouseDidMove(p5)) {
      lastMouseMove = new Date();
    }
    showMouseLoc(isMobile, lastMouseMove, p5);
  }

  const userTakeStep = (x, y) => {
    var t = new Date();
    let space = globalConfig.stepS;
    const prevStep = { x: stepTo.x, y: stepTo.y }
    const userStep = { x: stepTo.x + x * space, y: stepTo.y + y * space };
    const outsideDoor = doorCrossing(doors, prevStep, userStep);
    const roomDoorEntry = roomDoorEntryCrossing(rooms, prevStep, userStep);
    const roomDoor = roomDoorCrossing(rooms, prevStep, userStep);
    const roomDoorB = roomDoorBoundary(rooms, prevStep, userStep);
    // const poolB = poolBoundaryCrossing(userStep);
    // check if entering a room door
    // check if crossing into outside
    // check crossed an inside boundary
    // check if crossed a room boundary

    if (roomDoor) {
      if (window.confirm('Leave the main gallery?')) {
        props.userNewRoom(roomDoor);
      }
      isWalking = false;
      // console.log("entering room", roomDoor);
    }
    // else if (poolB) {
    //   isWalking = false;
    // }
    else if (outsideDoor) {
      // props.userMove(userStep.x, userStep.y);
      stepTo = { x: userStep.x, y: userStep.y };
      // console.log("outside door")
      props.toggleOutside();
    }
    else if (roomDoorEntry) {
      // props.userMove(userStep.x, userStep.y);
      stepTo = { x: userStep.x, y: userStep.y };
      // console.log("enter/exit room")
    }
    else if (roomBoundary(rooms, prevStep, userStep)) {
      isWalking = false;
      // console.log("room boundary")
    }
    else if (roomDoorB) {
      isWalking = false;
      // console.log("room door boundary")
    }
    else if (wallBoundary(walls, prevStep, userStep)) {
      isWalking = false;
      // console.log("wall boundary")
    }
    else {
      // props.userMove(userStep.x, userStep.y);
      stepTo = { x: userStep.x, y: userStep.y };
    }
    // console.log(new Date() - t);
  }

  const updateUserEase = (p5) => {
    if (!reachedDestination(userEase, stepTo)) {
      let amt = .7;
      userEase.x = userEase.x * amt + stepTo.x * (1 - amt);
      userEase.y = userEase.y * amt + stepTo.y * (1 - amt);
      let d = p5.dist(userEase.x, userEase.y, stepTo.x, stepTo.y);
      if (d < 15) {
        userEase.x = stepTo.x;
        userEase.y = stepTo.y;
        // isStepping = false;
        props.userMove(userEase.x, userEase.y);
      }

    }
  }

  const triggerMove = (setUserActive, p5) => {
    const userClicked = checkUserClicked(userEase, users, p5);
    if (userClicked) {
      setUserActive(userClicked);
      return;
    }
    else if (treeSlider.checkDragging(userEase.x, userEase.y, p5))
      return;
    else if (checkDivPress(userEase.x, user.y, divs))
      return;

    else {
      const dx = p5.mouseX > p5.windowWidth / 2 ? 50 : -50;
      const dy = p5.mouseY > p5.windowHeight / 2 ? 50 : -50;
      const mx = roundToMult2((p5.mouseX - p5.windowWidth / 2) + dx, globalConfig.stepS);
      const my = roundToMult2((p5.mouseY - p5.windowHeight / 2) + dy, globalConfig.stepS);
      if (!(mx === 0 && my === 0)) {
        const x = mx + user.x;
        const y = my + user.y;
        const time = new Date();
        destination = { x, y, time };
        isWalking = true;
      }
    }

  }

  const mouseStep = () => {
    if (isWalking) {
      if (reachedDestination(stepTo, destination)) {
        isWalking = false;
        // console.log("reached");
      }
      else if (new Date() - destination.time > 150) {
        let step = getNextStep(stepTo, destination);
        userTakeStep(step[0], step[1]);
        destination.time = new Date();
      }
    }
  }

  const keyPressed = (p5) => {
    if (p5.keyCode === p5.UP_ARROW) {
      userTakeStep(0, -1);
    }
    else if (p5.keyCode === p5.RIGHT_ARROW) {
      userTakeStep(1, 0);
    }
    else if (p5.keyCode === p5.LEFT_ARROW) {
      userTakeStep(-1, 0);
    }
    else if (p5.keyCode === p5.DOWN_ARROW) {
      userTakeStep(0, 1);
    }
  }

  const mouseReleased = (p5) => {
    endDivDrag(divs);
    treeSlider.endDrag();
  }

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }

  const doubleClicked = (p5) => {
    // console.log("db");
    checkFolderDivsDouble(userEase.x, userEase.y, divs);
    checkTrashDivsDouble(userEase.x, userEase.y, divs);
  }

  return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} keyPressed={keyPressed} mouseReleased={mouseReleased} doubleClicked={doubleClicked} />;
};
