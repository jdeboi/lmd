import React from 'react';
import glasses from './glasses.png';

export default function Glasses (props) {
  return (
    <div className="Glasses">
      <h2>Don't forget your 3D glasses!</h2>
      <p>This work is meant to be viewed in 2D and 3D.</p>
      <img src={glasses} width={350} height={90} />
    </div>
  )
}
