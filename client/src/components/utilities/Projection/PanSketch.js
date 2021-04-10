import React from "react";
import Sketch from "react-p5";

//////////////
// HELPERS
// import { doorCrossing, roomDoorCrossing, roomDoorEntryCrossing, roomDoorBoundary, roomBoundary, wallBoundary } from '../../sketches/Gallery/p5/functions/crossing';
// import { roundToMult2 } from '../../sketches/Gallery/p5/functions/round';
import { drawAllFloors } from '../../sketches/Gallery/p5/functions/floor';
import { drawWalls, drawRooms } from '../../sketches/Gallery/p5/functions/building';
import { displayDancers, updateDucks } from '../../sketches/Gallery/p5/functions/emojis';
// import { reachedDestination, getNextStep, showMouseLoc, showUserEllipses, showDestination, mouseDidMove } from '../../sketches/Gallery/p5/functions/destination';
import { drawUser, drawUsers, checkUserClicked } from '../../sketches/Gallery/p5/functions/users';
import { drawPlantRow, drawGrassPatch } from '../../sketches/Gallery/p5/functions/garden';
import { addTableDivs, displayTableDivs, addSwingDivs, displaySwingDivs, displayOakDivs, displayTreeDivs, displayBarDivs, displayTrashDivs, checkTrashDivsDouble, addTrashDivs, displayRoomLabelDivs, addDoorDivs, addLightDivs, addColumnDivs, addTreeDivs, addBarDivs, addOakDivs, addFolderDivs, displayDoorDivs, displayLightDivs, displayColumnDivs, displayDivs, endDivDrag, updateDivs, checkDivPress, displayFolderDivs, checkFolderDivsDouble, addRoomLabelDivs } from '../../sketches/Gallery/p5/functions/divs';
import TreeSlider from '../../sketches/Gallery/p5/components/TreeSlider';

//////////////
// COMPONENTS
import Wall from "../../sketches/Gallery/p5/components/Wall";
import Room from "../../sketches/Gallery/p5/components/Room";
import Duck from '../../sketches/Gallery/p5/components/Duck';
import Dancer from '../../sketches/Gallery/p5/components/Dancer';
// import MiniMap from "./components/MiniMap";


//////////////
// CONFIG
import { globalConfig, p5ToDomCoords } from "../../sketches/Gallery/constants";
var isClosed;

//////////////
// BUILDING 
var walls = [];
var rooms = [];
var roomTextures = [];
var eyeIcon;
var doors = [];
var doorImgs = [];
var floorTex;
var lightImgs = [];
var tableImgs = [];
var trashFiles = [];
var columnGif;
var closedSign;

//////////////
// PLANTS 
var flowerRow, ivory, tree, oakImg;
var treeSlider;

//////////////
// ICONS
var txtFile, instaImg;

//////////////
// EMOJIS
var ducks = [];
var duckImg;
var dancers = [];
var dancerImgs = [];
var baby;
var barEmojis = [];

//////////////
// FONT
var dogica;

//////////////
// DRAGGABLE DIVS
var divs = {};

// var miniMap;

//////////////
// MOVEMENT
var stepTo = { x: 0, y: 0 };
var userEase = { x: 0, y: 0 };
var viewTime = 0;
var stepToIndex = 0;

//////////////
// PROPS
var user, roomCount, isMobile;
var users = []


export default (props) => {
    user = props.user;
    users = props.users;
    isMobile = props.isMobile;
    roomCount = props.roomCount;
    isClosed = props.isClosed;

    const preload = (p5) => {
        const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/";

        //////////////
        // building textures
        floorTex = p5.loadImage(url + "concrete-512.jpg");
        doorImgs[0] = p5.loadImage(url + "door/frame2.png");
        doorImgs[1] = p5.loadImage(url + "door/leftdoor2.png");
        roomTextures[0] = p5.loadImage(url + "rooms/bot.png");
        roomTextures[1] = p5.loadImage(url + "rooms/right.png");
        roomTextures[2] = p5.loadImage(url + "rooms/left.png");
        eyeIcon = p5.loadImage(url + "eye.png")
        closedSign = p5.loadImage(url + "closed.png");

        //////////////
        // emojis
        duckImg = p5.loadImage(url + "duck.png");
        dancerImgs[0] = p5.loadImage(url + "dancers/dancer0.png");
        dancerImgs[1] = p5.loadImage(url + "dancers/dancer1.png");
        dancerImgs[2] = p5.loadImage(url + "dancers/dancer2.png");
        baby = p5.loadImage(url + "swing/baby.png");
        barEmojis[0] = p5.loadImage(url + "emojis/bread.png");
        barEmojis[1] = p5.loadImage(url + "emojis/cheese.png");
        barEmojis[2] = p5.loadImage(url + "emojis/wine.png");
        barEmojis[3] = p5.loadImage(url + "emojis/cocktail.png");
        barEmojis[4] = p5.loadImage(url + "emojis/chat.png");
        barEmojis[0] = p5.loadImage(url + "emojis/bread.png");
        barEmojis[1] = p5.loadImage(url + "emojis/cheese.png");
        barEmojis[2] = p5.loadImage(url + "emojis/wine.png");
        barEmojis[3] = p5.loadImage(url + "emojis/cocktail.png");
        barEmojis[4] = p5.loadImage(url + "emojis/chat.png");
        
        //////////////
        // plants
        tree = p5.loadImage(url + "grass/tree.png");
        ivory = p5.loadImage(url + "grass/ivory.png");
        flowerRow = p5.loadImage(url + "grass/cac3.png")
        oakImg = p5.loadImage(url + "grass/oak.png");

        //////////////
        // folder icons
        txtFile = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/txt.png");
        instaImg = p5.loadImage(url + "instagram.png");
        trashFiles[0] = p5.loadImage(url + "trash/fullrec.png")
        trashFiles[3] = p5.loadImage(url + "trash/trash0.png")
        trashFiles[2] = p5.loadImage(url + "trash/trash1.png")
        trashFiles[1] = p5.loadImage(url + "trash/trash2.png")

        //////////////
        // tables
        tableImgs[0] = p5.loadImage(url + "table/um_open.png")
        tableImgs[1] = p5.loadImage(url + "table/um_closed.png")

        //////////////
        // lights
        lightImgs[0] = p5.loadImage(url + "tracklights/tracklights_vert.jpg");
        lightImgs[1] = p5.loadImage(url + "tracklights/light_shadow.png");
        lightImgs[2] = p5.loadImage(url + "tracklights/tracklights_dark_vert.jpg");
        lightImgs[3] = p5.loadImage(url + "tracklights/black_shadow.png");

        // columnGif = p5.loadImage(url + "column.gif");
        columnGif = p5.loadGif("/assets/column.gif"); //not sure why this one has a cors issue

        // font
        dogica = p5.loadFont(url + "fonts/dogica.ttf");

    }

    ////////////////////////////////////////////////////////////////////////
    // INITIALIZE
    ////////////////////////////////////////////////////////////////////////
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)

        initBuilding(p5);
        initEmojis(p5);
        initDivs(p5);
        treeSlider = new TreeSlider(31, 40, 2);
        // miniMap = new MiniMap(p5, 50, p5.windowHeight - 200 - 80, 200, 200);
        stepTo = { x: 0, y: 0 };


        const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        cnv.parent(canvasParentRef);
        // cnv.mousePressed(() => triggerMove(props.setUserActive, p5));

        p5.textFont(dogica, 14);
        p5.frameRate(20);

        props.loadingDone();
    };

    const initEmojis = (p5) => {
        for (let i = 0; i < 8; i++) {
            ducks.push(new Duck(p5, 300, 2200, duckImg));
        }
        dancers[0] = new Dancer(p5, dancerImgs[0], 10, 160, false);
        dancers[1] = new Dancer(p5, dancerImgs[1], 200, 380, false);
        dancers[2] = new Dancer(p5, dancerImgs[2], 300, 150, true);
    }

    const initBuilding = (p5) => {
        for (let i = 0; i < 2; i++) {
            walls.push(new Wall(p5, i, globalConfig));
        }
        for (let i = 0; i < 13; i++) {
            rooms.push(new Room(p5, i));
        }
    }

    const initDivs = (p5) => {
        addOakDivs(divs, oakImg, p5);
        addDoorDivs(divs, doors, doorImgs, p5);
        addLightDivs(divs, lightImgs, p5);
        addColumnDivs(divs, columnGif, lightImgs[3], p5);
        addTreeDivs(divs, tree, p5);
        addTableDivs(divs, tableImgs, p5);
        addBarDivs(divs, lightImgs[3], p5);
        addTrashDivs(divs, trashFiles, lightImgs[3], p5);
        addFolderDivs(divs, instaImg, txtFile, p5);
        addRoomLabelDivs(divs, eyeIcon, p5);
        addSwingDivs(divs, baby, null, p5);
    }

    ////////////////////////////////////////////////////////////////////////
    // DRAW
    ////////////////////////////////////////////////////////////////////////
    const draw = (p5) => {
        p5.clear();

        // NOTE: Do not use setState in the draw function or in functions that are executed
        // in the draw function...
        // please use normal variables or class properties for these purposes
        p5.push();
        p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

        p5.push();
        p5.translate(-userEase.x, -userEase.y);


        p5.push();
        p5.translate(globalConfig.x * globalConfig.scaler, globalConfig.y * globalConfig.scaler)

        //////////////
        // floors
        drawAllFloors(floorTex, p5);

        //////////////
        // plants
        drawGrassPatch(ivory, ivory, p5);
        drawPlantRow(-5, 17, 1, 1, flowerRow, p5);
        drawPlantRow(0, 22, 1, 1, flowerRow, p5);
        drawPlantRow(5, 27, 1, 1, flowerRow, p5);
        drawPlantRow(20, 21, 1, 1, flowerRow, p5);
        drawPlantRow(27, 15, 1, 1, flowerRow, p5);

        //////////////
        // building
        drawWalls(walls, p5);
        drawRooms(rooms, roomTextures, eyeIcon, roomCount, p5);
        if (!isClosed)
            displayRoomLabelDivs(dogica, roomCount, userEase.x, userEase.y, divs);

        //////////////
        // emojis
        displayDancers(dancers);
        updateDucks(false, userEase.x, userEase.y, ducks);

        //////////////
        // draggable
        displayOakDivs(userEase.x, userEase.y, divs);
        displayTableDivs(userEase.x, userEase.y, divs);
        p5.textFont(dogica, 10);
        displaySwingDivs(userEase.x, userEase.y, divs);

        // seeUserClicked(userEase, users, p5)

        p5.pop();
        p5.pop();
        p5.pop();

        //////////////
        // step visualization
        // mouseStep();
        // showTarget(p5);

        //////////////
        // drawing
        drawOverTarget(p5);
        // drawUser(user, p5);
        drawOverUser(p5);

        //////////////
        // updating
        if (users)
            updateDivs(userEase, users, doors, divs, true);
        treeSlider.update(p5);
        // updateUserEase(p5);
        updateView(p5, 18000);

    };

    const updateView = (p5, t) => {

        if (p5.millis() - viewTime > t) {

            viewTime = p5.millis();

            let coords = [
                [5, 5],
                [20, 5],
                [20, 18],
                [16, 33],
                [5, 33],
                [12, 14]
            ]
            let coord = coords[stepToIndex++%coords.length];
            stepTo = p5ToDomCoords(coord[0], coord[1]); //p5.random(-1000, 1000);

            //   userEase.y = -1000; //p5.random(-10, 1000);
        }

        // transition to location
        let stepS = 15;
        if (p5.abs(stepTo.x - userEase.x) <= stepS) {
            userEase.x = stepTo.x;
        }
        else if (userEase.x < stepTo.x) {
            userEase.x += stepS;
        }
        else if (userEase.x > stepTo.x) {
            userEase.x -= stepS;
        }

        if (p5.abs(stepTo.y - userEase.y) <= stepS) {
            userEase.y = stepTo.y;
        }
        else if (userEase.y < stepTo.y) {
            userEase.y += stepS;
        }
        else if (userEase.y > stepTo.y) {
            userEase.y -= stepS;
        }
    }

    const drawOverTarget = (p5) => {
        p5.push();
        p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
        p5.translate(-userEase.x, -userEase.y);
        p5.translate(globalConfig.x * globalConfig.scaler, globalConfig.y * globalConfig.scaler)

        if (users)
            drawUsers(userEase, users, dogica, p5, barEmojis);

        p5.pop();
    }



    const drawOverUser = (p5) => {
        p5.push();
        p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
        p5.translate(-userEase.x, -userEase.y);
        p5.translate(globalConfig.x * globalConfig.scaler, globalConfig.y * globalConfig.scaler);
        displayDoorDivs(userEase.x, userEase.y, divs, isClosed, closedSign);
        displayBarDivs(userEase.x, userEase.y, divs);
        displayTreeDivs(userEase.x, userEase.y, treeSlider.getValue(p5), divs);
        displayLightDivs(userEase.x, userEase.y, divs);
        displayColumnDivs(userEase.x, userEase.y, divs);

        p5.textFont(dogica, 12);
        displayFolderDivs(divs);
        displayTrashDivs(userEase.x, userEase.y, divs);

        treeSlider.display(p5);

        p5.pop();

        if (p5.windowWidth !== p5.width || p5.windowHeight !== p5.height)
            windowResized(p5);
    }

    ////////////////////////////////////////////////////////////////////////
    // MOVEMENT
    ////////////////////////////////////////////////////////////////////////
    //   const showTarget = (p5) => {
    //     showDestination(userEase, destination, isWalking, p5);
    //     showUserEllipses(userEase, destination, isWalking, p5);

    //     if (mouseDidMove(p5)) {
    //       lastMouseMove = new Date();
    //     }
    //     showMouseLoc(isMobile, lastMouseMove, p5);
    //   }

    //   const userTakeStep = (x, y) => {
    //     var t = new Date();
    //     let space = globalConfig.stepS;
    //     const prevStep = { x: stepTo.x, y: stepTo.y }
    //     const userStep = { x: stepTo.x + x * space, y: stepTo.y + y * space };
    //     const outsideDoor = doorCrossing(doors, prevStep, userStep);
    //     const roomDoorEntry = roomDoorEntryCrossing(rooms, prevStep, userStep);
    //     const roomDoor = roomDoorCrossing(rooms, prevStep, userStep);
    //     const roomDoorB = roomDoorBoundary(rooms, prevStep, userStep);
    //     // const poolB = poolBoundaryCrossing(userStep);
    //     // check if entering a room door
    //     // check if crossing into outside
    //     // check crossed an inside boundary
    //     // check if crossed a room boundary

    //     if (!isClosed && roomDoor) {
    //       if (window.confirm('Leave the main gallery?')) {
    //         props.userNewRoom(roomDoor);
    //       }
    //       isWalking = false;
    //       // console.log("entering room", roomDoor);
    //     }
    //     // else if (poolB) {
    //     //   isWalking = false;
    //     // }
    //     else if (!isClosed && outsideDoor) {
    //       // props.userMove(userStep.x, userStep.y);
    //       stepTo = { x: userStep.x, y: userStep.y };
    //       // console.log("outside door")
    //       props.toggleOutside();
    //     }
    //     else if (!isClosed && roomDoorEntry) {
    //       // props.userMove(userStep.x, userStep.y);
    //       stepTo = { x: userStep.x, y: userStep.y };
    //       // console.log("enter/exit room")
    //     }
    //     else if (!isClosed && roomBoundary(rooms, prevStep, userStep)) {
    //       isWalking = false;
    //       // console.log("room boundary")
    //     }
    //     else if (!isClosed && roomDoorB) {
    //       isWalking = false;
    //       // console.log("room door boundary")
    //     }
    //     else if (wallBoundary(walls, prevStep, userStep)) {
    //       isWalking = false;
    //       // console.log("wall boundary")
    //     }
    //     else {
    //       // props.userMove(userStep.x, userStep.y);
    //       stepTo = { x: userStep.x, y: userStep.y };
    //     }
    //     // console.log(new Date() - t);
    //   }

    //   const updateUserEase = (p5) => {
    //     if (!reachedDestination(userEase, stepTo)) {
    //       let amt = .7;
    //       userEase.x = userEase.x * amt + stepTo.x * (1 - amt);
    //       userEase.y = userEase.y * amt + stepTo.y * (1 - amt);
    //       let d = p5.dist(userEase.x, userEase.y, stepTo.x, stepTo.y);
    //       if (d < 15) {
    //         userEase.x = stepTo.x;
    //         userEase.y = stepTo.y;
    //         // isStepping = false;
    //         props.userMove(userEase.x, userEase.y);
    //       }

    //     }
    //   }

    //   const triggerMove = (setUserActive, p5) => {
    //     let userClicked = false;
    //     if (users)
    //       userClicked = checkUserClicked(userEase, users, p5);
    //     if (userClicked) {
    //       setUserActive(userClicked);
    //       return;
    //     }
    //     else if (treeSlider.checkDragging(userEase.x, userEase.y, p5))
    //       return;
    //     else if (checkDivPress(userEase.x, user.y, divs))
    //       return;

    //     else {
    //       const dx = p5.mouseX > p5.windowWidth / 2 ? 50 : -50;
    //       const dy = p5.mouseY > p5.windowHeight / 2 ? 50 : -50;
    //       const mx = roundToMult2((p5.mouseX - p5.windowWidth / 2) + dx, globalConfig.stepS);
    //       const my = roundToMult2((p5.mouseY - p5.windowHeight / 2) + dy, globalConfig.stepS);
    //       if (!(mx === 0 && my === 0)) {
    //         const x = mx + user.x;
    //         const y = my + user.y;
    //         const time = new Date();
    //         destination = { x, y, time };
    //         isWalking = true;
    //       }
    //     }

    //   }

    //   const mouseStep = () => {
    //     if (isWalking) {
    //       if (reachedDestination(stepTo, destination)) {
    //         isWalking = false;
    //         // console.log("reached");
    //       }
    //       else if (new Date() - destination.time > 150) {
    //         let step = getNextStep(stepTo, destination);
    //         userTakeStep(step[0], step[1]);
    //         destination.time = new Date();
    //       }
    //     }
    //   }

    //   const keyPressed = (p5) => {
    //     if (p5.keyCode === p5.UP_ARROW) {
    //       userTakeStep(0, -1);
    //     }
    //     else if (p5.keyCode === p5.RIGHT_ARROW) {
    //       userTakeStep(1, 0);
    //     }
    //     else if (p5.keyCode === p5.LEFT_ARROW) {
    //       userTakeStep(-1, 0);
    //     }
    //     else if (p5.keyCode === p5.DOWN_ARROW) {
    //       userTakeStep(0, 1);
    //     }
    //   }

    //   const mouseReleased = (p5) => {
    //     endDivDrag(divs);
    //     if (treeSlider) treeSlider.endDrag();
    //   }

    const windowResized = (p5) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }

    //   const doubleClicked = (p5) => {
    //     // console.log("db");
    //     checkFolderDivsDouble(userEase.x, userEase.y, divs);
    //     checkTrashDivsDouble(userEase.x, userEase.y, divs);
    //   }

    return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} />;
};
