//🧀
import React from 'react';
import Frame from '../../../../shared/Frame/Frame';

export default function(props) {
  return (
    <Frame title="" windowStyle={{backgroundColor: "white"}} content={
        <div className="CocktailBar Bar" >
          <div>🍸🍸</div>
          <div>🍸🍸</div>
          <div>🍸🍸</div>
          <div>🍸🍸</div>
        </div>
      }
      width={props.w} height={props.h} x={props.x} y={props.y} z={props.z} bounded={false}
      />
  )
}
