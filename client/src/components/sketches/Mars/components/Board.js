



import React from 'react';
import Frame from '../../../shared/Frame/Frame';

export default function(props) {

  const {w, h, x, y, factor} = props;

  return (
    <Frame title="" 
    content={<div className="diving" style={{height: Math.floor(152*factor), width: Math.floor(500*factor)}}></div>} 
    width={w} 
    height={h} 
    x={x} 
    y={y} 
    />

  )
}
