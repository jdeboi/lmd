import React from 'react';
// import { Link } from 'react-router-dom';
import './Pages.css';

function About(props) {
  let classN = "Page " + props.ui.size;
  if (props.ui.hasFooter && props.ui.orientation === "landscape")
    classN += " landscape";
  return (
    <div className={classN}>

      <div className="About container">
        {/* <div className="container"> */}
        <h1>about</h1>
        <h3>Tulane University</h3>
        <h3>MFA Thesis Exhibition</h3>
        <h3>April 2021</h3>

        <br></br>
        <p>Jenna deBoisblanc is a New Orleans native, a creative coder, and a teacher. She received her undergraduate degree in physics from Pomona College and her MFA in digital art from Tulane University in New Orleans. She has shown work locally at Good Children Gallery and at Luna Fete, as well as at light festivals in the SouthWest. Her clients include Toyota, the Aloft Hotel, the Florida Aquarium, and NASA.</p>
        <br></br>
        <h3>---</h3>
        <p>
          <a href="https://jdeboi.com">jdeboi.com</a>
          <br></br>
          <a href="https://www.instagram.com/jdeboi/">@jdeboi</a>
          <br></br>
          jdeboi at gmail
          </p>
        {/* </div> */}
      </div>
    </div>
  );
}

export default About;
