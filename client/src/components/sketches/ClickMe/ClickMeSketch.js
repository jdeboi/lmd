import React from "react";
import Sketch from "react-p5";

//////////////
// PROPS
let w, h;

let hand;
let isErasing = false;
let cursor;
let point0, point1, point2, point3, point4, kiss;
let fullS = false;

export default (props) => {
    w = props.w;
    h = props.h;
    fullS = props.fullS;
    cursor = props.cursor;

    const preload = (p5) => {
        const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/clickMe/";
        // hand = p5.loadImage("/assets/s3-bucket/clickMe/pointer.png");
        point0 = p5.loadImage(url + "cursors/point0.png");
        point1 = p5.loadImage(url + "cursors/point1.png");
        point2 = p5.loadImage(url + "cursors/point2.png");
        point3 = p5.loadImage(url + "cursors/point3.png");
        point4 = p5.loadImage(url + "cursors/point4.png");
        kiss = p5.loadImage(url + "cursorImages/kiss.png");
    }

    ////////////////////////////////////////////////////////////////////////
    // INITIALIZE
    ////////////////////////////////////////////////////////////////////////
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        if (fullS) {
            w = p5.windowWidth;
            h = p5.windowHeight;
        }
        const cnv = p5.createCanvas(w, h);
        cnv.parent(canvasParentRef);
        cnv.mousePressed(() => canvasPressed(p5));
        
        p5.textSize(54);
    };

    ////////////////////////////////////////////////////////////////////////
    // DRAW
    ////////////////////////////////////////////////////////////////////////
    const draw = (p5) => {
        // p5.clear();
        // p5.background(255, 0, 0);
    }

    const mouseDragged = (p5) => {
        
        addMark(p5);
    }

    const keyPressed = (p5) => {
        if (p5.key == 'e') {
            isErasing = !isErasing;
        }
    }

    const canvasPressed = (p5) => {
        addMark(p5);
    }

    const mousePressed = (p5) => {
        addMark(p5);
        // console.log("?>")
    }
    const addMark = (p5) => {
        if (cursor === 'erase') {
            p5.erase();
            p5.ellipse(p5.mouseX, p5.mouseY, 100);
            p5.noErase();
        }
        else if (cursor === 'kiss')
            p5.image(kiss, p5.mouseX, p5.mouseY, 40, 40);
        else if (cursor === 'point0')
            p5.image(point0, p5.mouseX, p5.mouseY, 40, 40);
        else if (cursor === 'point1')
            p5.image(point1, p5.mouseX, p5.mouseY, 40, 40);
        else if (cursor === 'point2')
            p5.image(point2, p5.mouseX, p5.mouseY, 40, 40);
        else if (cursor === 'point3')
            p5.image(point3, p5.mouseX, p5.mouseY, 40, 40);
        else if (cursor === 'point4')
            p5.image(point4, p5.mouseX, p5.mouseY, 40, 40);
        // else if (cursor === 'kiss')
        //     p5.text("💋", p5.mouseX, p5.mouseY);
    }

    const mouseReleased = (p5) => {
    }


    const doubleClicked = (p5) => {

    }

    const windowResized = (p5) => {
        if (fullS) {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        }
    }

    return <Sketch preload={preload} setup={setup} draw={draw} keyPressed={keyPressed} mousePresse={mousePressed} mouseReleased={mouseReleased} mouseDragged={mouseDragged} doubleClicked={doubleClicked} windowResized={windowResized} />;
};
