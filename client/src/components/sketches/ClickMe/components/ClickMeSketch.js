// import React from "react";
// import Sketch from "react-p5";
// import { addDesktopDivs, addMobilePortraitDivs,addMobileLandscapeDivs, displayDivs, updateDivs, drawDivSquares, checkDivPress, endDivDrag, addMobilePortrait } from './components/divs';

// var divs = { windows: [] };
// let blinds;
// let coverImg;
// let isDragging = false;
// let wallTexture;
// // let bkImg;
// let shadow;

// let ui;
// //////////////
// // PROPS


// export default (props) => {
//     //   user = props.user;
//     ui = props.ui;

//     const preload = (p5) => {
//         const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches";
//         blinds = p5.loadImage(url + "/blinds/blinds_sm.png");
//         wallTexture = p5.loadImage(url + "/blinds/wallpaper/stuccoblk.jpg");
//         shadow = p5.loadImage(url + "/gallery/tracklights/black_shadow.png");
//     }

//     ////////////////////////////////////////////////////////////////////////
//     // INITIALIZE
//     ////////////////////////////////////////////////////////////////////////
//     const setup = (p5, canvasParentRef) => {
//         // use parent to render the canvas in this ref
//         // (without that p5 will render the canvas outside of your component)

//         const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
//         cnv.parent(canvasParentRef);
//         cnv.mousePressed(() => canvasPressed(p5));

//         // let dim = getCenterCoverDim(p5, wallTexture.width, wallTexture.height);
//         // wallTexture.resize(dim.w, dim.h)
//         wallTexture.resize(wallTexture.width*.4, wallTexture.height*.4 )

//         if (ui.hasFooter && ui.orientation === "portrait")
//             addMobilePortraitDivs(ui, divs, blinds, shadow, p5)
//         else if (ui.hasFooter && ui.orientation === "landscape")
//             addMobileLandscapeDivs(ui, divs, blinds, shadow, p5)
//         else
//             addDesktopDivs(ui, divs, blinds, shadow, p5);
//         initGraphics(p5);

//         // p5.textFont(dogica, 14);
//         // p5.frameRate(20);

//         props.loadingDone();

//         // wallTexture.resize(p5.windowWidth, p5.windowHeight);

//     };

//     ////////////////////////////////////////////////////////////////////////
//     // DRAW
//     ////////////////////////////////////////////////////////////////////////
//     const draw = (p5) => {
//         p5.clear();
//         // let bkDim = getCenterCoverDim(p5, bkImg.width, bkImg.height);
//         // p5.image(bkImg, bkDim.x, bkDim.y, bkDim.w, bkDim.h);


//         p5.image(coverImg, 0, 0, p5.windowWidth, p5.windowHeight);
//         //    purple
//         // let col = p5.color(10, 0, 20, 250)
//         // let col2 = p5.color(255, 0, 255, 150);
//         // displayDivs(divs, col, col2, col2);

//         // white
//         // let col = p5.color(220, 255)
//         // let col2 = p5.color(255, 0);
//         // displayDivs(divs, col, col2, p5.color(100));

//         let buttoncol = p5.color(255);
//         let framecol = p5.color(255, 50)
//         // let toolcol = p5.color(150, 150, 100, 100);
//         let toolcol = p5.color(110, 119, 54, 180);
//         displayDivs(divs, toolcol, framecol, buttoncol);
//         updateDivs(divs);



//     }

    

//     const mouseDragged = (p5) => {
       

//     }

//     const keyPressed = (p5) => {

//     }

//     const canvasPressed = (p5) => {
 
//     }


//     const mouseReleased = (p5) => {
  
//     }

//     const windowResized = (p5) => {
//         p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
//         initGraphics(p5);

//     }

//     const doubleClicked = (p5) => {

//     }


//     return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} keyPressed={keyPressed} mouseReleased={mouseReleased} mouseDragged={mouseDragged} doubleClicked={doubleClicked} />;
// };
