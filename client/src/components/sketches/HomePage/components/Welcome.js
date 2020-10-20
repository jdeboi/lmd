import React from 'react';
import Frame from '../../../shared/Frame/Frame';

export default function(props) {
  return (
    <Frame title="Welcome" windowStyle={{backgroundColor: "white"}} content={
        <div className="MFA-deets" >
          <div style={{fontSize: "40px", paddingBottom: "0px"}}>Losing</div>
          <div style={{fontSize: "40px", paddingBottom: "0px"}}>My</div>
          <div style={{fontSize: "40px", paddingBottom: "40px"}}>Dimension</div>

          <div style={{fontSize: "20px", paddingBottom: "40px"}}><a href="https://www.instagram.com/jdeboi/">Jenna deBoisblanc</a></div>

          <div style={{fontSize: "12px", paddingBottom: "10px"}}>Tulane University</div>
          <div style={{fontSize: "14px", paddingBottom: "20px"}}>MFA Thesis Exhibition</div>
          <div style={{fontSize: "12px"}}>April 2021</div>
        </div>
      }
      width={props.w} height={props.h} x={props.x} y={props.y} z={props.z}  bounded={false}
      />
  )
}
