import React from 'react';
import './Instructions.css';

export default function Instructions (props) {
  return (
    <div className="Instructions">
      <div></div>
      <div className="Instructions-list">
        <div className="instruction">
          <img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" width="200px" height="200px" />
          <div className="instruction-txt">
            <h3>Moving</h3>
            <p>Press the arrow keys to move around the scene</p>
          </div>
        </div>
        <div className="instruction">
          <img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" width="200px" height="200px" />
          <div className="instruction-txt">
            <h3>Chatting</h3>
            <p>Click a user to begin a chat</p>
          </div>
        </div>

        <div className="instruction">
          <img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" width="200px" height="200px" />
          <div className="instruction-txt">
            <h3>Getting info</h3>
            <p>Click the info button to bring up this guide</p>
          </div>
        </div>

        <div className="instruction">
          <img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" width="200px" height="200px" />
          <div className="instruction-txt">
            <h3>Mini Map</h3>
            <p>Click the map button to bring up the mini map</p>
          </div>
        </div>

      </div>
      <div className="welcome-buttons">
        <button className="standardButton" onClick={props.prevStep}>back</button>
        <button className="standardButton highlightButton" onClick={props.closeWelcome}>finish</button>
      </div>
    </div>
  )
}
