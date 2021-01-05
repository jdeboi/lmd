import React from 'react';
import { getOtherUserLocation } from '../../sketches/Gallery/MiniMap/Helpers';

function ToolTip(props) {
  const { userName, userHover } = props;
  // if (userHover) {
  const sty = { top: -20, left: 0 };
  return (
    <div className="tooltip" style={sty}>{userName}</div>
  );
  // }
  // return (
  //   <div></div>
  // );
}



export default ToolTip;
