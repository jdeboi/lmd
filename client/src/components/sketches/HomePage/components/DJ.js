import React from 'react';
import Frame from '../../../shared/Frame/Frame';

export default function(props) {
  return (
    <Frame title="" windowStyle={{backgroundColor: "white"}} content={
        <div className="WineBar" >
          <div>🎛️🎛️</div>
          <div>🎚️</div>
          <div>🎤</div>
          <div>🎧</div>
        </div>
      }
      width={200} height={80} x={props.x} y={props.y} z={props.z} bounded={false}
      />
  )
}
