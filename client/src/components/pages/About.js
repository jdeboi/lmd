import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';

function About() {
  return (
    <div className="Frame-box">
      <div className="Page">

        <div className="About">
          <div className="container">
            <h1>Artist Statement</h1>
            <p>Thinking about the simultaneous collapse / expansion of space during quarantine.</p>
            <ul>
              <li>2D & multi-dimensional</li>
              <li>confined but digitally liberated</li>
            </ul>
            <p>Thinking about "home" in quarantine. Home pages, home spaces.</p>
            <ul>
              <li>safe haven & prison</li>
            </ul>
            <p>Thinking about access to digital spaces in quarantine.</p>
            <ul>
              <li>"same boat, different storm"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
