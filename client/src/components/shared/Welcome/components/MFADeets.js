import React from 'react';

export default function MFADeets(props) {
  return (
    <div className="Welcome-Deets">
      <div className="MFA-deets" >
        <div className="MFA-txt">
          <div style={{fontSize: "40px", paddingBottom: "0px"}}>Losing</div>
          <div style={{fontSize: "40px", paddingBottom: "0px"}}>My</div>
          <div style={{fontSize: "40px", paddingBottom: "40px"}}>Dimension</div>

          <div style={{fontSize: "20px", paddingBottom: "40px"}}><a href="https://www.instagram.com/jdeboi/">Jenna deBoisblanc</a></div>

          <div style={{fontSize: "12px", paddingBottom: "10px"}}>Tulane University</div>
          <div style={{fontSize: "14px", paddingBottom: "20px"}}>MFA Thesis Exhibition</div>
          <div style={{fontSize: "12px"}}>April 2021</div>
        </div>
        {/* <div className="welcome-buttons">
          <button className="standardButton highlightButton" onClick={props.nextStep}>next</button>
        </div> */}
      </div>

    </div>
  )
}
