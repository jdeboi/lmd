import React from 'react';
import DesktopIcon from '../../../shared/DesktopIcon/DesktopIcon';

export default function(props) {
  const box = {x: 100, y: 100, w: 300, h: 100};
  return (
    <div className="folders">
      <DesktopIcon title={"statement"} x={props.x+20} y={props.y} bounded={false} box={box} onDblClick={() => props.onDblClick(0)} newFrameToTop={() => props.newFrameToTop(0)} newIconToTop={() => props.newIconToTop(0)} zIcon={props.zIcons[0]} zFrame={props.zFrames[0]}
        content={
          <img src={window.AWS+"/waveforms/txt.png"} width={80} height={80} />
        }
        frameContent={
          <div className="txt">about</div>
        }
        />
      <DesktopIcon title={"thesis"}x={props.x+80} y={props.y+130} bounded={false} box={box} onDblClick={() => props.onDblClick(1)} newFrameToTop={() => props.newFrameToTop(1)} newIconToTop={() => {props.newIconToTop(1)}} zIcon={props.zIcons[1]} zFrame={props.zFrames[1]}
        content={
          <img src={window.AWS+"/waveforms/txt.png"} width={80} height={80} />
        }
        frameContent={
          <div className="txt">about</div>
        }
        />
      <DesktopIcon title={"instagram"}x={props.x-30} y={props.y+230} box={box} bounded={false} onDblClick={() => props.onDblClick(2)} newFrameToTop={() => {props.newFrameToTop(2)}} newIconToTop={() => {props.newIconToTop(2)}} zIcon={props.zIcons[2]} zFrame={props.zFrames[2]}
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
