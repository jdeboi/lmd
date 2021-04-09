import React from 'react';
import { mapVal, constrain } from '../../../../shared/Helpers/Helpers';
import { getDim } from '../EmojiMonitor/Helper';
import Rose from './Rose';

// import './Rose.css';

export default function Roses(props) {
    const { ui, hR, hT } = props;
    const dim = getDim(ui);
    const { x, y, w, h } = dim;

    let roseDim = mapVal(ui.contentW, 1400, 2500, 80, 120);
    roseDim = constrain(roseDim, 80, 120);
    roseDim = Math.floor(roseDim);
    const roseBuffer = 20;

    const roseBL = { x: x - roseDim - roseBuffer, y: y - (ui.toolbarH + roseDim) / 2 };
    const roseBR = { x: x + w + roseBuffer, y: roseBL.y };

    const roseTL = { x: x, y: ui.contentH - y - ui.toolbarH - h };
    const roseTR = { x: x + w - roseDim, y: roseTL.y };

    const bigRoseTL = { x: roseTL.x - roseBuffer - roseDim * 2, y: roseTL.y + roseDim };
    const bigRoseTR = { x: roseTR.x + roseBuffer + roseDim, y: bigRoseTL.y };

    return (

        <React.Fragment>
            {/* <Pulse heartRate={this.state.hR} maxHeart={maxHeart} /> */}
            <Rose w={roseDim * 2} x={bigRoseTL.x} y={bigRoseTL.y} heartRate={hR} heartTotal={hT} />
            <Rose w={roseDim * 2} x={bigRoseTR.x} y={bigRoseTR.y} heartRate={hR} heartTotal={hT} />

            <Rose w={roseDim} x={roseBL.x} y={roseBL.y} heartRate={hR} heartTotal={hT} />
            <Rose w={roseDim} x={roseBR.x} y={roseBR.y} heartRate={hR} heartTotal={hT} />
            <Rose w={roseDim} x={roseTL.x} y={roseTL.y} heartRate={hR} heartTotal={hT} />
            <Rose w={roseDim} x={roseTR.x} y={roseTR.y} heartRate={hR} heartTotal={hT} />
            {/* <Rose w={roseDim} x={500} y={100} heartRate={hR} heartTotal={hT} /> */}
        </React.Fragment>
    )
}
