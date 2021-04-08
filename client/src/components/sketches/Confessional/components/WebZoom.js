

import React from 'react';
import Frame from '../../../shared/Frame/Frame';
import Webcam from "react-webcam";


export default function WebZoom(props) {
    const { x, y, w, h, videoOn } = props;

    const videoConstraints = {
        width: w,
        height: h,
        facingMode: "user"
    };
    // why was the frame className=static?
    return (

        <Frame content={
            /* <img height={130} width={230} src="https://media4.giphy.com/media/UiwxIx9BElaVi/giphy.gif?cid=ecf05e47a8bbe3d9385a466e6febc98bd9d83fe2e23ed054&rid=giphy.gif" />*/
            <div>
                {videoOn ? <Webcam videoConstraints={videoConstraints} /> : null}
                <img alt="Holy Spirt gif" src={window.AWS + "/waveforms/divine.gif"} width={"100%"} height={"100%"} style={{ opacity: .3, position: "absolute", top: 0, left: 0 }} />
            </div>
        }
            x={x} y={y} width={videoConstraints.width} height={videoConstraints.height}
        />
    )
}