import React from 'react';
import Frame from '../../../shared/Frame/Frame';

export default function(props) {

  const {w, h, x, y, buttonClick} = props;

  return (
    <Frame title="" content={
      <div className="tank">
      <button onClick={() => {buttonClick(3)}}><span className="swimSign">0</span>ft</button>
      <button onClick={() => {buttonClick(2)}}><span className="swimSign">3</span>ft</button>
      <button onClick={() => {buttonClick(1)}}><span className="swimSign">5</span>ft</button>
      <button onClick={() => {buttonClick(0)}}><span className="swimSign">8</span>ft</button>
      </div>
    }
    width={w} height={h} x={x} y={y}
    />
  )
}
