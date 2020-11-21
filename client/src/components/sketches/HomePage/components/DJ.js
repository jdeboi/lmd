import React from 'react';
import Frame from '../../../shared/Frame/Frame';

export default function(props) {
  let emojis = "🎛️🎛️🎚️🎚️🎤🔈";

  return (
    <Frame title="" windowStyle={{backgroundColor: "white"}} content={
        <div className="DJStation" >
          <div>{emojis}</div>
        </div>
      }
      width={195} height={42} x={props.x} y={props.y} z={props.z} bounded={false}
      />
  )
}
