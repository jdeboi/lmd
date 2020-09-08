import React from 'react';
import "./Stair.css";
import Frame from '../../../shared/Frame/Frame';

function Stair(props) {

  return (
    <div className="Stair">
    <Frame title="" content={getStairContent(props)}
      width={props.stepW+24} height={10} x={props.x} y={props.y} window={"stair-window"} handle={".step"}
      />
    </div>
  );
}

function getStairContent(props) {
  let numSteps = props.numSteps;
  let stepW = props.stepW;
  let stepH = props.stepH;
  let stepDown = props.stepDown;
  let steps = [];

  for(let i = 0; i < numSteps; i++) {
    steps.push(i);
  }
  return (steps.map((val, i) => {
    let classN = "step";
    if (i == 0) classN += " firstStep"
    if (i == numSteps -1) classN += " lastStep"
    let num = i;


    let factor = 1;
    let oneImage = false;
    let bgpos, bgsize;
    if (oneImage) {
       bgpos =   (-i*stepW) + "px " + (-i*stepDown) + "px";
       bgsize= (stepW*numSteps*factor) + "px " + ((stepH + stepDown*numSteps)*factor) + "px";
    }
    else {
      bgpos = "0px 0px";
      bgsize = stepW + "px " + stepH + "px";
    }

    // let bgsize = "500px 500px"//"auto " + (stepH + (stepH-stepDown)*numSteps) + " px";
    return (
      <div className={classN} key={i} style={{width: stepW, height: stepH, top: -30+stepDown*i, left: stepW*i, backgroundImage: `url(${props.url})`, backgroundPosition: bgpos, backgroundSize: bgsize}}></div>
    );
  }));
}
export default Stair;
