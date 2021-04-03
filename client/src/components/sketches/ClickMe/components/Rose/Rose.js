import React from 'react';
import Frame from '../../../../shared/Frame/Frame';
import {mapVal} from '../../../../shared/Helpers/Helpers';

// import './Rose.css';

export default function Rose(props) {
    const { x, y, w, heartRate} = props;
    const h = w;

    const numFrames = 37;
    let fr = Math.floor(mapVal(heartRate, 30, 400, 0, numFrames));
    let dx = -fr*w;

    const roseStyle = {
        backgroundImage: `url("${window.AWS}/clickMe/rosesprite3.png")`,
        backgroundSize: "cover",
        backgroundPosition: `${dx}px 0px`,
        width: w,
        height: h
    };

    

    return (

        <Frame title="" content={
            <div className="rose" style={roseStyle} />

        }
            width={w} height={h} x={x} y={y}
        />
    )
}
