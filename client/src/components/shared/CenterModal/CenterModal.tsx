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

  let zInd = 2500;
  const {w, h} = getCenterModalDim(width, height);
  const x = (width - w) / 2;
  const y = (height - h - 24) / 2;

  const classT = classN + (!isHidden ? " GrayedOut" : "");


  return (
    <div className={classT} style={{ visibility: (isHidden ? "hidden" : "visible"), zIndex: zInd }}>
      <Frame title={title} isHidden={isHidden} onHide={onHide} windowStyle={{ background: "white" }} content={
        <div className="CenterModal SignInForm" style={{ width: w, height: h }}>
          <div className="CenterModal-Container" style={{ padding: 20, width: w - 40, height: h - 40 }}>
            {content}
            {buttons}
          </div>
        </div>
      }
        width={w} height={h} x={x} y={y}
      />
    </div>
  );


}
