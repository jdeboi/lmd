import React from "react";
import Sketch from "react-p5";
var floorTex;

export default (props) => {
  let x = 50;
  const y = 50;
  const user = props.user;
  const users = props.users;
  const walls = props.walls;
  const doors = props.doors;



  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL).parent(canvasParentRef);
    // img = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/jungleGyms/wallpaper3.jpg",
    // img => {p5.image(img, 0, 0);},
    // (err) => { console.log("ERR", err)}

    const wallpaper = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/jungleGyms/wallpaper3.jpg";
    const floor = "/assets/s3-bucket/homePage/wood-512.jpg";
    floorTex = p5.loadImage(floor);
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

    drawWalls(p5);
    drawDoors(p5);

    p5.pop();

  };


  const drawWalls = (p5) => {
    p5.beginShape();
    p5.textureWrap(p5.REPEAT);
    p5.texture(floorTex);
    // p5.vertex(0, 0, 0, 0);
    // p5.vertex(200, 0, 200, 0);
    // p5.vertex(200, 200, 200, 200);
    // p5.vertex(0, 200, 0, 200);
    for (let i = 0; i < walls.length; i++) {
      p5.vertex(walls[i].x, walls[i].y,walls[i].x, walls[i].y);
    }
    p5.endShape();

    // lines
    p5.strokeWeight(5);
    p5.stroke(255);
    for (let i = 0; i < walls.length-1; i++) {
      p5.line(walls[i].x, walls[i].y, walls[i+1].x, walls[i+1].y);
    }
  }

  const drawDoors = (p5) => {
    p5.strokeWeight(10);
    p5.stroke(255, 0, 0);
    for (let i = 0; i < doors.length; i++) {
      p5.line(doors[i].x0, doors[i].y0, doors[i].x1, doors[i].y1);
    }
  }

  return <Sketch setup={setup} draw={draw} />;
};
