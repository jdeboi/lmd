import React, { MouseEvent, KeyboardEvent } from 'react';
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
  z: number,
  ui: any,
  isRelative: boolean,
  onHide(): any
}


export default function CenterModal({ title, classN, ui, z, height, width, isHidden, content, buttons, isRelative, onHide }: CenterModalProps) {


  let { w, h, x, y } = getCenterModalDim(ui, isRelative);
  if (classN === 'confessional-modal') {
    console.log(x, y, w, h);
  }
  if (height && width) {
    h = Math.min(h, height);
    w = Math.min(w, width);
    y = (ui.contentH - h - ui.toolbarH) / 2;
    if (!isRelative)
      y += ui.headerH;
    x = (ui.contentW - w) / 2;
  }
  const classT = (!isHidden ? " GrayedOut" : "");


  const handleMouse = (e: MouseEvent) => {
    e.stopPropagation();
  }

  const handleDoubleClick = (e: MouseEvent) => {
    e.stopPropagation();
  }

  return (
    <React.Fragment>
      <div className={classT} onDoubleClick={handleDoubleClick} style={{ visibility: (isHidden ? "hidden" : "visible"), zIndex: z }} />
      <Frame title={title} isHidden={isHidden} bounded={true} onHide={onHide} windowStyle={{ background: "white" }} content={
        <div className={classN + " CenterModal SignInForm"} style={{ width: w, height: h }}>
          <div className="CenterModal-Container" style={{ padding: 20, width: w - 40, height: h - 40 }}>
            {content}
            {buttons}
          </div>
        </div>
      }
        width={w} height={h} x={x} y={y} z={z + 1}
      />
    </React.Fragment>
  );


}
