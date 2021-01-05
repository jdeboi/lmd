import Folder from '../components/Folder';
import Draggable from '../components/Draggable/Draggable';
import ShadowDraggable from '../components/Draggable/ShadowDraggable';
import Door from "../components/Door";
import Light from '../components/Light';
import Bar from '../components/Bar';
import RoomLabel from '../components/RoomLabel';

import { globalConfig } from '../../constants';


export const addRoomLabelDivs = (roomLabels, divs, eyeIcon, p5) => {
    for (let i = 0; i < 13; i++) {
        let roomL = new RoomLabel(p5, i, eyeIcon);
        roomLabels.push(roomL);
        divs.push(roomL);
      }
}

export const displayRoomLabelDivs = (dogica, roomCount, userX, userY, roomLabels) => {
    for (const rl of roomLabels) {
        rl.display(dogica, roomCount);
        rl.displayToolBar(userX, userY);
    }
}

export const addDoorDivs = (doors, divs, doorImgs, p5) => {
    let numDoors = 4;
    for (let i = 0; i < numDoors; i++) {
      let door = new Door(p5, i, doorImgs);
      doors.push(door);
      divs.push(door);
    }
  }

  export const addLightDivs = (lights, divs, lightImgs, p5) => {
    let numLights = 3;
    for (let i = 0; i < numLights; i++) {
      let light = new Light(p5, i, lightImgs);
      lights.push(light);
      divs.push(light);
    }
  }

  export const addColumnDivs = (columns, divs, columnGif, shadow, p5) => {
    let sc = globalConfig.scaler;
    let numCols = 4;
    const dy = 140;
    const dx = 140;
    let gx = 16.5 * sc
    let gy = 34.5 * sc
    for (let i = 0; i < numCols; i++) {
      let column = new ShadowDraggable(i, gx + dx * i, gy - dy * i, 80, 280, p5, columnGif, shadow)
      columns.push(column)
      divs.push(column)
    }
  }


export const addFolderDivs = (divs, folders, instaImg, txtFile, p5) => {
    let labels = [
        { x: 560, y: 0, label: "statement", link: "https://www.instagram.com/jdeboi/" },
        { x: 620, y: 130, label: "thesis", link: "http://losingmydimension.com/thesis.pdf" },
        { x: 510, y: 230, label: "instagram", link: "https://www.instagram.com/jdeboi/" }
    ];

    for (let i = 0; i < 3; i++) {
        const { x, y, label, link } = labels[i];
        // p5, id, x, y, label, link, img
        const folder = new Folder(p5, i, x, y, label, link, i == 2 ? instaImg : txtFile);
        folders.push(folder)
        divs.push(folder);
    }
}

export const addOakDivs = (divs, oakImg, p5) => {
    let sc = globalConfig.scaler;
    for (let i = 0; i < 1; i++) {
        let oak = new Draggable(i, sc * -7.5, sc * 34, 500, 400, p5, oakImg);
        divs.push(oak);
    }
}

export const addBarDivs = (divs, lightImg, p5) => {
    for (let i = 0; i < 4; i++) {
        divs.push(new Bar(i, lightImg, p5));
    }
}

export const addTreeDivs = (divs, tree, p5) => {
    // let inc = 10;
    let numTrees = 8;
    for (let i = 0; i < numTrees; i++) {
        // let x = p5.windowWidth/2+i*inc;
        // let y = 60+i*inc;
        let w = 500;
        let sp = 50;
        divs.push(new Draggable(i, i * sp + 2400, i * sp + 3000, w, w, p5, tree));
    }
}

export const displayDoorDivs = (userX, userY, doors) => {
    for (const door of doors) {
        door.display(userX, userY);
        door.displayToolBar(userX, userY);
    }
    // for(let i = 0; i < 4; i++) {
    //   divs[i].display(user.x, user.y);
    //   divs[i].displayToolBar(user.x, user.y);
    // }
}

export const displayLightDivs = (userX, userY, lights) => {
    for (const light of lights) {
        light.display(userX, userY);
        light.displayToolBar(userX, userY);
    }
}

export const displayFolderDivs = (dogica, folders) => {
    for (const folder of folders) {
        folder.display(dogica);
    }
}

export const displayColumnDivs = (userX, userY, columns) => {
    for (const col of columns) {
        col.display(userX, userY);
        col.displayToolBar(userX, userY);
    }
}


export function displayDivs(userX, userY, divs) {

    //
    for (let i = 7; i < divs.length - 3 - 13; i++) {
        divs[i].display(userX, userY);
        divs[i].displayToolBar(userX, userY);
    }

}

export function endDivDrag(divs) {
    for (const div of divs) {
        div.endDrag();
    }
}

export function updateDivs(userEase, users, doors, divs) {
    // for (const door of doors) {
    //   door.openDoor(userEase, users);
    // }
    for (let i = 0; i < 4; i++) {
        doors[i].openDoor(userEase, users);
    }
    for (const div of divs) {
        div.update();
    }

}


export const checkDivPress = (userX, userY, divs) => {
    for (const div of divs) {
        if (div.checkButtons(userX, userY)) {
            return true;
        }
        else if (div.checkDragging(userX, userY)) {
            return true;
        }
    }
    return false;
}

export const checkFolderDivsDouble = (userX, userY, folders) => {
    for (const folder of folders) {
        folder.checkDoubleClicked(userX, userY);
    }
}