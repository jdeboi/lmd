import React from 'react';
import './FAQ.css';
import chatGif from './assets/chat_md.gif';
import moveGif from './assets/move_md.gif';

export default function FAQ(props) {

  return (
    <div className="Instructions-list flexPad flex1">

      {/* MOVING */}
      <div className="instruction">
        <div className="faqImg"><img src={moveGif} /></div>
        <div className="instruction-txt">
          <h3>Move</h3>
          <p>Click on tiles or press arrow keys.</p>
        </div>
      </div>

      {/* CHATTING */}
      <div className="instruction">
        <div className="faqImg"><img src={chatGif} /></div>
        <div className="instruction-txt">
          <h3>Chat</h3>
          <p>Click a user to begin a chat or select from user dropdown</p>
        </div>
      </div>

      {/* ENTERING ROOM */}
      <div className="instruction">
        <div className="faqImg"><img src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/placeholder_200.jpg" /></div>
        <div className="instruction-txt">
          <h3>Enter Room</h3>
          <p>Walk on the stairs to view individual works</p>
        </div>
      </div>

      {/* BACK TO GALLERY */}
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
