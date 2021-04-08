


import React from 'react';
import Frame from '../../../../shared/Frame/Frame';

export default function Candle(props) {

    return (
        <Frame title=""
            windowStyle={{ background: "transparent" }}
            className={"confessional-frame"}
            content={
                <img alt="candle gif" src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/candle.gif" width="100%" height="100%" />
            }
            width={80}
            height={90}
            x={props.x}
            y={props.y}
        />

    )
}