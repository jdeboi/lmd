



import { globalConfig } from "../../constants";

export const drawWalls = (walls, p5) => {
    p5.stroke(255);
    p5.strokeWeight(2);
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


export const drawDoors = (doors, p5) => {
    p5.strokeWeight(4);
    p5.fill(0);
    p5.stroke(80);
    if (doors) {
        for (const door of doors) {
            door.display(p5);
        }
    }
}

export const drawRooms = (rooms, roomTextures, eyeIcon, roomCount, p5) => {
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

