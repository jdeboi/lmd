import React from 'react';

export default function MFADeets(props) {
  let fontsBig = [40, 20, 14, 12];
  let fontsSmall = [30, 18, 14, 12];
  let fontsXSmall = [28, 16, 12, 12];
  let fonts = fontsBig;
  if (props.width < 350) {
    fonts = fontsXSmall;
  }
  else if (props.width < 500) {

    fonts = fontsSmall;
  }
  
  
  return (
    <div className="Welcome-Deets">
      <div className="MFA-deets" >
        <div className="MFA-txt">
          <div style={{fontSize: fonts[0], paddingBottom: "0px"}}>Losing</div>
          <div style={{fontSize: fonts[0], paddingBottom: "0px"}}>My</div>
          <div style={{fontSize: fonts[0], paddingBottom: "40px"}}>Dimension</div>

          <div style={{fontSize: fonts[1], paddingBottom: "40px"}}><a href="https://www.instagram.com/jdeboi/">Jenna deBoisblanc</a></div>

          <div style={{fontSize: fonts[3], paddingBottom: "10px"}}>Tulane University</div>
          <div style={{fontSize: fonts[2], paddingBottom: "10px"}}>MFA Thesis Exhibition</div>
          <div style={{fontSize: fonts[3], paddingBottom: "10px"}}>April 2021</div>
        </div>
      </div>

    </div>
  )
}
