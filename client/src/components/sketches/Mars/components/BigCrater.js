

import React from 'react';
import Frame from '../../../shared/Frame/Frame';

export default function(props) {

  const {w, h, x, y, isFlipped, poolVid} = props;
  const vidC = isFlipped?" rot90":"";

  return (
    <Frame title="" content={
      <div className={"bigCrater" + vidC} style={{height: `${h}px`, backgroundSize: `${w}px ${h}px`}}>
      <video playsInline className={"poolVid"} key={poolVid} style={{height: `${h}px`, width: `${w}px`}} autoPlay muted loop>
      <source src={poolVid} type="video/mp4" ></source>
      Your browser does not support HTML5 video.
      </video>
      </div>
    }
    width={w} height={h} x={x} y={y}
    />
  )
}
