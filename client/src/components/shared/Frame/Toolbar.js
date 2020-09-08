import React from 'react';

function Toolbar(props) {
  return(
    <div className="titlebar menuTheme handle">
      <div className="buttons">
        <div className="close circleButton" onClick={props.toggleClosed}>
          <div className="closebutton"><div className="innerC"></div></div>

        </div>
        <div className="minimize circleButton" onClick={props.toggleMinimzed}>
          <div className="minimizebutton"><div className="innerC"></div></div>

        </div>
        <div className="zoom circleButton" onClick={props.toggleMaximized}>
          <div className="zoombutton"><div className="innerC"></div></div>

        </div>
      </div>
      <div className="titleTxtContainer">{props.title}</div>


    </div>
  );
}

export default Toolbar
