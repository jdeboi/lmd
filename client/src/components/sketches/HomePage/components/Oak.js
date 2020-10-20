import React from 'react';
import Frame from '../../../shared/Frame/Frame';

export default function(props) {
  return (
    <Frame title="" windowStyle={{backgroundColor: "white"}} content={
        <img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/homePage/grass/oak.png" width="100%" height="100%" />
      }
      width={props.w} height={props.h} x={props.x} y={props.y} z={props.z} bounded={false}
      />
  )
}
