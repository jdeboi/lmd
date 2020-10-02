
export default function sketch (p) {;

  var font;
  var users = [];
  var user = {};
  var walls = [];
  var doors = [];
  var floorTex;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight); //, p.WEBGL
    // emoji = p.loadImage("")
    floorTex = p.loadImage("/assets/s3-bucket/homePage/wood.png");
    // font = p.loadFont('/assets/s3-bucket/homePage/EmojiOneColor.otf', 50);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.users) {
      users = props.users;
      user = props.user;
      walls = props.walls;
      doors = props.doors;
    }
  };

  p.draw = function () {
    // p.textFont(font);
    p.textSize(50);
    p.background(255,0,0);



    p.push();
    p.translate(-user.x, -user.y);
    p.translate(p.windowWidth/2, p.windowHeight/2);
    p.drawWalls();
    p.drawDoors();
    p.drawUsers();
    p.pop();

    p.drawUser();
  };

  p.drawWalls = () => {
    // p.beginShape();
    // p.texture(floorTex);
    p.strokeWeight(1);
    for (let i = 0; i < walls.length-1; i++) {
      p.line(walls[i].x, walls[i].y, walls[i+1].x, walls[i+1].y);
    }
    // p.endShape();
  }

  p.drawDoors = () => {
    p.strokeWeight(10);
    for (let i = 0; i < doors.length; i++) {
      p.line(doors[i].x0, doors[i].y0, doors[i].x1, doors[i].y1);
    }
  }

  p.drawUsers = () => {
    // other users
    for (let i = 0; i < users.length; i++) {
      let x = users[i].x;
      let y = users[i].y;
      p.text(users[i].avatar, x-25, y+18);
      // p.ellipse(x, y, 10)
    }
  }

  p.drawUser = () => {
    // user position
    p.push();
    // p.translate(0, 0, 1);
    p.translate(p.windowWidth/2, p.windowHeight/2);

    // p.ellipse(0, 0, 100);
    p.text(user.avatar, -25, 18);
    // console.log("US", user.avatar);
    // p.ellipse(0, 0, 10)
    p.pop();
  }

};
