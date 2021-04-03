import React from 'react';
import Frame from '../../../../shared/Frame/Frame';
import {mapVal} from '../../../../shared/Helpers/Helpers';

// import './Rose.css';

export default function Rose(props) {
    const { x, y, w, heartRate, heartTotal} = props;
    const h = w;
    // let dx = Math.floor(mapVal(heartRate, 30, 400, 0, 18));
    // dx *= 200;

    const numFrames = 37;
    // let fr = Math.floor(numFrames/2*Math.sin(heartTotal/5) + numFrames/2);
    let fr = Math.floor(mapVal(heartRate, 30, 400, 0, numFrames));
    // console.log(fr);
    let dx = -fr*w;

    const roseStyle = {
        backgroundImage: `url("/assets/s3-bucket/clickMe/rose/rosesprite3.png")`,
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
