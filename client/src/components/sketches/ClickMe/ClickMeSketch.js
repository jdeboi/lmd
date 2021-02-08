import React from "react";
import Sketch from "react-p5";

//////////////
// PROPS
let w, h;

let hand;
let isErasing = false;
let tool;

export default (props) => {
    w = props.w;
    h = props.h;
    tool = props.tool;

    const preload = (p5) => {
        const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/";
        hand = p5.loadImage("/assets/s3-bucket/clickMe/pointer.png");
    }

    ////////////////////////////////////////////////////////////////////////
    // INITIALIZE
    ////////////////////////////////////////////////////////////////////////
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)

        const cnv = p5.createCanvas(w, h);
        cnv.parent(canvasParentRef);
        cnv.mousePressed(() => canvasPressed(p5));



    };

    ////////////////////////////////////////////////////////////////////////
    // DRAW
    ////////////////////////////////////////////////////////////////////////
    const draw = (p5) => {
        // p5.clear();

    }

    const mouseDragged = (p5) => {
        p5.textSize(54);
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
        console.log("?>")
    }
    const addMark = (p5) => {
        if (tool === 'erase') {
            p5.erase();
            p5.ellipse(p5.mouseX, p5.mouseY, 100);
            p5.noErase();
        }
        else if (tool === 'hand')
            p5.image(hand, p5.mouseX, p5.mouseY, 40, 40);
        else if (tool === 'kiss')
            p5.text("💋", p5.mouseX, p5.mouseY);
    }

    const mouseReleased = (p5) => {
    }

    // const windowResized = (p5) => {
    //     p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    //     initGraphics(p5);

    // }

    const doubleClicked = (p5) => {

    }

    //windowResized={windowResized}
    return <Sketch preload={preload} setup={setup} draw={draw} keyPressed={keyPressed} mousePresse={mousePressed} mouseReleased={mouseReleased} mouseDragged={mouseDragged} doubleClicked={doubleClicked} />;
};
