


import React from 'react';
import Frame from '../../../../shared/Frame/Frame';
import ConfessFormContent from './ConfessFormContent';

export default function ConfessionFormFrame(props) {

    return (
        <Frame title=""
            windowStyle={{ background: "transparent" }}
            className={"confessional-frame"}
            content={
                <ConfessFormContent {...props} />
            }
            width={props.w}
            height={props.h}
            x={props.x}
            y={props.y}
        />

    )
}