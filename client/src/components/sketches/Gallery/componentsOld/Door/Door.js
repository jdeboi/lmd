import React from 'react';
import Frame from '../../../../shared/Frame/Frame';
import { globalConfig } from '../../constants';
import './Door.css';

export default function (props) {
    var isOpen = checkUser(props) || checkUsers(props);
    const w = props.isFlipped ? props.h : props.w;
    const h = props.isFlipped ? props.w : props.h;
    return (
        <Frame title="" windowStyle={{ background: "transparent" }} content=
            {
                <div className={"Door" + (props.isFlipped ? " rotDoor" : " normDoor")}>
                    <img className={"door"} src={"https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/door/leftdoor2.png"} width={w} height={h} style={getStyle(isOpen, props.isFlipped, w, 0)} />
                    <img className={"door flippedX"} src={"https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/door/leftdoor2.png"} width={w} height={h} style={getStyle(isOpen, props.isFlipped, w, 1)} />
                    <img className={"doorFrame"} src={"https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/door/frame2.png"} width={w} height={h} />
                </div>
            }
            width={props.w} height={props.h} x={props.x + props.dx} y={props.y + props.dy} z={500} bounded={false}
        />
    )
}

const getStyle = (isOpen, isFlipped, w, id) => {
    var val = w / 4;
    if (id == 0)
        val *= -1;
    return { left: isOpen ? val : 0 };
}

const checkUsers = (props) => {
    const { x, y, w, h, users, isFlipped } = props;
    if (!users) return false;
    for (const user of users) {
        if (closeToDoor(x, y, w, h, user, isFlipped))
            return true;
    }
    return false;
}

const checkUser = (props) => {
    const { x, y, w, h, user, isFlipped } = props;
    return closeToDoor(x, y, w, h, user, isFlipped);
}

const closeToDoor = (x, y, w, h, user, isFlipped) => {
    if (!user) return false;

    var triggerH = globalConfig.scaler * 5;
    var triggerW = globalConfig.scaler * 4;
    if (isFlipped) {
        let temp = triggerW;
        triggerW = triggerH;
        triggerH = temp;
    }
    const xCenter = x + w / 2;
    const yCenter = y + 24 + h / 2;

    const minX = xCenter - triggerW / 2;
    const maxX = xCenter + triggerW / 2;
    const minY = yCenter - triggerH / 2;
    const maxY = yCenter + triggerH / 2;

    const ux = user.x + 34 / 2;
    const uy = user.y + 34 / 2;
    // if (print) console.log(user.x, minX, maxX, ";", user.y, minY, maxY);
    return (ux > minX && ux < maxX && uy > minY && uy < maxY);
}