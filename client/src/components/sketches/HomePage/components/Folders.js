import React from 'react';
import DesktopIcon from '../../../shared/DesktopIcon/DesktopIcon';

export default function(props) {
  const box = {x: 100, y: 100, w: 100, h: 100};
  return (
    <div className="folders">
      <DesktopIcon title={"statement"} onDblClick={props.onDblClick} x={props.x} y={props.y} z={props.z0} bounded={false} box={box}
        content={
          <img src={window.AWS+"/waveforms/txt.png"} width={80} height={80} />
        }
        frameContent={
          <div className="txt">about</div>
        }
        />
      <DesktopIcon title={"thesis"} onDblClick={props.onDblClick} x={props.x+80} y={props.y+100} z={props.z1} bounded={false} box={box}
        content={
          <img src={window.AWS+"/waveforms/txt.png"} width={80} height={80} />
        }
        frameContent={
          <div className="txt">about</div>
        }
        />
      <DesktopIcon title={"instagram"} onDblClick={props.onDblClick} x={props.x+30} y={props.y+250} z={props.z2} box={box} bounded={false}
        content={
          <img src={window.AWS+"/homePage/instagram.png"} width={80} height={80} />
        }
        frameContent={
          <div className="txt">about</div>
        }
        />
    </div>
  )

}
