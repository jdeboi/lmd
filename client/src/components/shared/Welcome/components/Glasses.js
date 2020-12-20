import React from 'react';
import glasses from './glasses.png';

export default function Glasses (props) {
  return (
    <div className="Glasses flex1 flexPad">
      <h2>Don't forget your 3D glasses!</h2>
      <p>This work is meant to be viewed in 2D and 3D.</p>
      <img src={glasses} className="center" width="70%" />
    </div>
  )
}
