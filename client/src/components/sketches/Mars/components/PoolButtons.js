import React from 'react';
import Frame from '../../../shared/Frame/Frame';

export default function(props) {

  const {w, h, x, y, factor, buttonClick} = props;

  const buttonStyle = {
    paddingTop: Math.floor(factor * 16),
    width: Math.floor(factor * 74), 
    fontSize: Math.floor(factor * 55)
  };

  const ftStyle = {
    fontSize: Math.floor(factor * 18)
  } 
  
  return (
    <Frame title="" content={
      <div className="tank" style={{backgroundSize: `${Math.floor(39*factor)}px ${Math.floor(40*factor)}px`}}>
      <button style={buttonStyle} onClick={() => {buttonClick(3)}}><span className="swimSign">0</span><span style={ftStyle}>ft</span></button>
      <button style={buttonStyle} onClick={() => {buttonClick(2)}}><span className="swimSign">3</span><span style={ftStyle}>ft</span></button>
      <button style={buttonStyle} onClick={() => {buttonClick(1)}}><span className="swimSign">5</span><span style={ftStyle}>ft</span></button>
      <button style={buttonStyle} onClick={() => {buttonClick(0)}}><span className="swimSign">8</span><span style={ftStyle}>ft</span></button>
      </div>
    }
    width={w} height={h} x={x} y={y}
    />
  )
}
