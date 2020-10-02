import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';

function Credits() {
  return (
    <div className="Frame-box">
    <div className="Page">
    <div className="Credits">
    <div className="container">
    <h1>Credits</h1>
    <h2><Link to="/macbook-air">Macbook Air</Link></h2>
    <p>
    <ul>
    <li>thanks to Google for the <a href="https://poly.google.com/view/8Qwgncb6dJT">Umbrella Palm Tree</a>, licensed under CC BY 2.0</li>
    <li>thanks to bhgilad for the <a href="https://www.turbosquid.com/3d-models/80s-pool-chair-3d-model-1489585">pool chair</a></li>
    </ul>
    </p>
    <h2><Link to="/hard-drives-on-seashores">Hard Drives on Seashores</Link></h2>
    <p>
    <ul>
    <li>thanks to Google for the <a href="https://poly.google.com/view/8Qwgncb6dJT">Umbrella Palm Tree</a>, licensed under CC BY 2.0</li>
    <li>thanks to Slanted Studios for the <a href="https://giphy.com/media/l3Uchq9s6Hx0aK8F2/giphy.gif">bird gif</a></li>
    </ul>
    </p>
    <h2><Link to="/jungle-gyms">Jungle Gyms</Link></h2>
    <p>
    <ul>
    <li>special thanks to <a href="https://github.com/1j01/pipes/blob/master/screensaver.js">Isaiah Odhner for the pipes code</a></li>
    </ul>
    </p>
    </div>
    </div>
    </div>
    </div>
  );
}


export default Credits;
