import React from 'react';
import Swan from './Swan';
import { p5ToDomCoords, pools, poolSpace } from '../../constants';

export default function Pools(props) {
    const { x, y } = props;
    let pos = p5ToDomCoords(pools[0].x+poolSpace, pools[0].y+poolSpace);
    // const x = props.x + this.state.OGW;
    // const y = props.y + this.state.OGH;
    let dx = 500;

    return (
        <div className="pools" style={{ position: "absolute", left: x+pos.x, top: y+pos.y }}>
            <div className="poolContainer"  style={{position: "relative"}}>
                {getPool(0, 0)}
                {getPool(dx, dx)}
                {getPool(dx * 2, dx * 2)}
                {/* {getPool(dx * 3, dx * 3)} */}
            </div>
        </div>
    )
}

function getPool(dx, dy) {
    return (
            <div className="pool" style={{ position: "absolute", left: dx, top: dy }}>
                {/* <Swan x={0} y={0} /> */}
            </div>
    )
}