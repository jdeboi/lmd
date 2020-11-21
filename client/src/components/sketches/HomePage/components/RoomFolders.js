import React from 'react';
import DesktopIcon from '../../../shared/DesktopIcon/DesktopIcon';
import { rooms, p5ToDomCoords } from '../constants';

export default function (props) {
  


  return (
    <div className="roomFolders">
      { rooms.map((room, i) => {
        const box = { x: 100+i*24, y: 100+i*24, w: 400, h: 100 };
        let dx, dy;
        if( room.dir === "left"){
          dx = 1+.1;
          dy = .1;
        }
        else if (room.dir === "bottom") {
          dy = 3;
          dx = .1;
        }
        else {
          dx = 3;
          dy = 3.9;
        }
        let pos = p5ToDomCoords(room.x+dx, room.y+dy);
        return (
          <DesktopIcon
            key={i}
            title={getRoomFolderLabel(room.label)}
            x={pos.x + props.x}
            y={pos.y + props.y}
            bounded={false}
            box={box}
            onDblClick={() => props.onDblClick(i)}
            // newFrameToTop={() => props.newFrameToTop(i)}
            // newIconToTop={() => props.newIconToTop(i)}
            // zIcon={props.zIcons[i]}
            // zFrame={props.zFrames[i]}
            zIcon={400}
            zFrame={1500}
            content={
              <img src={window.AWS + "/waveforms/txt.png"} width={80} height={80} />
            }
            frameContent={
              <div className="room-info">
                <h3>{room.label}</h3>
                <p>{room.about}</p>
              </div>
            }
          />
        )
      })}

    </div>
  )


}


function getRoomFolderLabel (label) {
  let max = 11;
  if (label.length > max) {
    return label.substring(0, max) + "...";
  }
  return label;
}