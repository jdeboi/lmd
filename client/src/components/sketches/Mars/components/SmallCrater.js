



import React from 'react';
import Frame from '../../../shared/Frame/Frame';

export default function(props) {

  const {w, h, x, y, factor} = props;

  return (
    <Frame title="" content={
        <div className="smallCrater" style={{backgroundSize: `${Math.floor(w)}px ${Math.floor(w)}px`}}>
          <div className="bubbles" style={{top: Math.floor(75*factor), left: Math.floor(74*factor)}}>
            <img src={window.AWS + "/mars/bubbles3.gif"} width={w} height={h} />
          </div>
        </div>
      }
        width={w} height={h} x={x} y={y}
      />
  )
}
