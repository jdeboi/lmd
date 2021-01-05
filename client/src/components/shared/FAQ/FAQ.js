import React from 'react';
import './FAQ.css';

export default function FAQ(props) {

  return(
    <div className="Instructions-list flexPad flex1">
      <div className="instruction">
      <div className="faqImg"><img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" /></div>
        <div className="instruction-txt">
          <h3>Move</h3>
          <p>Press arrow keys or click on tiles</p>
        </div>
      </div>
      <div className="instruction">
      <div className="faqImg"><img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" /></div>
        <div className="instruction-txt">
          <h3>Chat</h3>
          <p>Click a user to begin a chat or select from user dropdown</p>
        </div>
      </div>

      <div className="instruction">
      <div className="faqImg"><img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" /></div>
        <div className="instruction-txt">
          <h3>Info</h3>
          <p>Click the info icon to bring up this guide</p>
        </div>
      </div>

      <div className="instruction">
      <div className="faqImg"><img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" /></div>
        <div className="instruction-txt">
          <h3>Map</h3>
          <p>Click the map icon to bring up the mini map</p>
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
