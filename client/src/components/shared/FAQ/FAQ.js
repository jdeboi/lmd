import React from 'react';
import './FAQ.css';

export default function FAQ(props) {

  return(
    <div className="Instructions-list flexPad flex1">
      <div className="instruction">
      <div className="faqImg"><img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" /></div>
        <div className="instruction-txt">
          <h3>Moving</h3>
          <p>Press the arrow keys to move around the scene</p>
        </div>
      </div>
      <div className="instruction">
      <div className="faqImg"><img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" /></div>
        <div className="instruction-txt">
          <h3>Chatting</h3>
          <p>Click a user to begin a chat</p>
        </div>
      </div>

      <div className="instruction">
      <div className="faqImg"><img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" /></div>
        <div className="instruction-txt">
          <h3>Getting info</h3>
          <p>Click the info button to bring up this guide</p>
        </div>
      </div>

      <div className="instruction">
      <div className="faqImg"><img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" /></div>
        <div className="instruction-txt">
          <h3>Mini Map</h3>
          <p>Click the map button to bring up the mini map</p>
        </div>
      </div>
      <div className="instruction">
      <div className="faqImg"><img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" /></div>
        <div className="instruction-txt">
          <h3>Enter Room</h3>
          <p>Walk on the stairs to view individual works</p>
        </div>
      </div>
      <div className="instruction">
      <div className="faqImg"><img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" /></div>
        <div className="instruction-txt">
          <h3>Back to Gallery</h3>
          <p>Click the browser back button or click the show title, "Losing My Dimension"</p>
        </div>
      </div>
    </div>
  )
}
