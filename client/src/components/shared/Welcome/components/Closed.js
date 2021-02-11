import React from 'react';

export default function Closed(props) {
  let fontsBig = [40, 20, 14, 12, 10];
  let fontsSmall = [30, 18, 14, 12, 10];
  let fontsXSmall = [28, 16, 12, 12, 10];
  let fonts = fontsBig;
  if (props.width < 350) {
    fonts = fontsXSmall;
  }
  else if (props.width < 500) {

    fonts = fontsSmall;
  }
  
  
  return (
    <div className="Welcome-Deets">
      <div className="MFA-deets closed" >
        <div className="MFA-txt">
          <div style={{fontSize: fonts[3], paddingBottom: "30px"}}>While you're free to roam the grounds, we're sorry to inform you that the gallery is currently</div>
          <div style={{fontSize: fonts[0], paddingBottom: "30px"}}>CLOSED</div>
          <div style={{fontSize: fonts[3], paddingBottom: "10px"}}>Please join us for the opening on:</div>
          <div style={{fontSize: fonts[1], paddingBottom: "5px"}}>Saturday, April 10th</div>
          <div style={{fontSize: fonts[1], paddingBottom: "10px"}}>5PM - 9PM CST</div>
          {/* <div style={{fontSize: fonts[4], paddingBottom: "0px"}}>Occurring virtually and offline at Antenna / The Front</div> */}
        </div>
      </div>

    </div>
  )
}
