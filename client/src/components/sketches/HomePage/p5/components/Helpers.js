




const outlineRooms = (p5, rooms, scaler=wallConfig.scaler) => {
  for (let i = 0; i < rooms.length; i++) {
    var w = 5*scaler;
    var h = 5*scaler;
    // if (rooms[i].id === "B") h = 7*scaler;
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


const drawRoomDoors = (p5, rooms, scaler=wallConfig.scaler) => {
  for (let i = 0; i < rooms.length; i++) {
    var w = 5*scaler;
    var h = 5*scaler;
    // if (rooms[i].id === "B") h = 7*scaler;
    p5.push();
    p5.translate(rooms[i].x*scaler, rooms[i].y*scaler);
    p5.translate(w/2, h/2);
    p5.rotate(rooms[i].rot/180*Math.PI);
    // p5.translate(-w/2, -h/2);
    // if (rooms[i].id ==="B") p5.line(-h*.25, w/2, h*.25, w/2);
    // else
    p5.line(-w*.25, h/2, w*.25, h/2);
    p5.pop();
  }
}
