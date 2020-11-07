import React from 'react';
import {Link} from 'react-router-dom';
import './Pages.css';

function About() {
  return (
      <div className="Page">

        <div className="About Sketch">
          <div className="container">
            <h1>losing my dimension</h1>
            <h3><a href="https://jdeboi.com">Jenna deBoisblanc</a></h3>
            <br></br>
            <h3>Tulane University</h3>
            <h3>MFA Thesis Exhibition</h3>
            <h3>April 2021</h3>
            <h3><a href="">Thesis</a></h3>
            <h2>Statement</h2>
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
  );
}

export default About;
