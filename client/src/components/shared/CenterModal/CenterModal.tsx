import React from 'react';
import Frame from '../Frame/Frame';
import './CenterModal.css';
import { getCenterModalDim } from './Helper';

interface CenterModalProps {
  title: string,
  classN: string,
  content: JSX.Element,
  buttons: JSX.Element,
  width: number,
  height: number,
  isHidden: boolean,
  onHide(): any
}

export default function CenterModal({ title, classN, width, height, isHidden, content, buttons, onHide }: CenterModalProps) {

  let zInd =1000;
  const {w, h , x, y} = getCenterModalDim(width, height);

  const classT = (!isHidden ? " GrayedOut" : "");


  return (
    <React.Fragment>
    <div className={classT} style={{ visibility: (isHidden ? "hidden" : "visible"), zIndex: zInd }} />
      <Frame title={title} isHidden={isHidden} bounded={true} onHide={onHide} windowStyle={{ background: "white" }} content={
        <div className={classN + " CenterModal SignInForm"} style={{ width: w, height: h }}>
          <div className="CenterModal-Container" style={{ padding: 20, width: w - 40, height: h - 40 }}>
            {content}
            {buttons}
          </div>
        </div>
      }
        width={w} height={h} x={x} y={y} z={zInd + 1}
      />
    </React.Fragment>
  );


}
