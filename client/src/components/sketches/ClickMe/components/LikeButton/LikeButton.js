import React from 'react';
import Frame from '../../../../shared/Frame/Frame';
import './LikeButton.css';

export default function LikeButton(props) {
    const { x, y, w, h, heartClicked } = props;
    //    const w = 80;
    //    const h = 34;
    return (

        <Frame title="" content={
            <div className="LikeButton">
                <div className="btn"
                    style={{ width: w-10, height: h-10 }}
                    onClick={() => heartClicked(1)}
                />
            </div>
        }
            width={w} height={h} x={x} y={y}
        />
    )
}