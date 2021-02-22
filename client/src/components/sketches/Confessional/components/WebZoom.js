

import React from 'react';
import Frame from '../../../shared/Frame/Frame';
import Webcam from "react-webcam";


export default function WebZoom(props) {
    const { x, y, audioOn, videoOn } = props;

    const factor = 1.4;
    const videoConstraints = {
      width: 230 * factor,
      height: 130 * factor,
      facingMode: "user"
    };

    return (

        <Frame className="static" content={
            /* <img height={130} width={230} src="https://media4.giphy.com/media/UiwxIx9BElaVi/giphy.gif?cid=ecf05e47a8bbe3d9385a466e6febc98bd9d83fe2e23ed054&rid=giphy.gif" />*/
            <div>
                {videoOn?<Webcam videoConstraints={videoConstraints} />:null}
                <img src={window.AWS + "/waveforms/divine.gif"} width={"100%"} height={"100%"} style={{ opacity: .3, position: "absolute", top: 0, left: 0 }} />
            </div>
        }
            x={x} y={y} width={videoConstraints.width} height={videoConstraints.height}
        />
    )
}