import React from 'react';
import glasses from './glasses.png';

export default function Glasses(props) {
  return (
    <div className="Glasses flex1 flexPad">
      <div className="instruction">
        {/* <h2>Get 3D glasses!</h2>
        <hr></hr> */}
        <p>This work is meant to be viewed in both 2D and 3D using red / cyan anaglyph glasses.</p>
        <br />

        <img src={glasses} className="center" />
        {/* <ul>
          <li><a href="https://forms.gle/xCUeomKay4Jo2H5r8" target="_blank">Request a free pair</a> (limited)</li>
          <li><a href="https://www.amazon.com/Blue-White-Cardboard-Glasses-Pairs/dp/B001P6C7ZY/ref=sr_1_35?dchild=1&keywords=anaglyph+glasses&qid=1609440890&sr=8-35" target="_blank">Purchase</a> a pair online</li>
        </ul> */}
        <h2>Make sure the red lens is over your LEFT eye.</h2>
      </div>
    </div>
  )
}
