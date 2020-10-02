import React from "react";
import Sketch from "react-p5";
var img;

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
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    img = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/jungleGyms/wallpaper3.jpg",
    img => {p5.image(img, 0, 0);},
    (err) => { console.log("ERR", err)}
  );
};

const draw = (p5) => {
  p5.background(0);

  // NOTE: Do not use setState in the draw function or in functions that are executed
  // in the draw function...
  // please use normal variables or class properties for these purposes

  p5.push();
  p5.translate(-user.x, -user.y);
  p5.translate(p5.windowWidth/2, p5.windowHeight/2);
  // if (img) p5.image(img, 0, 0);

  drawWalls(p5);
  drawDoors(p5);

  p5.pop();

};


const drawWalls = (p5) => {
  // p.beginShape();
  // p.texture(floorTex);
  p5.strokeWeight(5);
  p5.stroke(255);
  for (let i = 0; i < walls.length-1; i++) {
    p5.line(walls[i].x, walls[i].y, walls[i+1].x, walls[i+1].y);
  }
  // p.endShape();
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
