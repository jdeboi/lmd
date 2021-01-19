
import React from 'react';
import LiveBar from './LiveBar';
import Frame from '../../../../shared/Frame/Frame';


export default function PearlyGates(props) {
    const { w, h, x, y } = props;
    const doveX = x + w / 2 - 45;
    const doveY = y + h / 2 - 45;
    let yLive = h - 55;
    if (h < 400)
        yLive = h - 35;
    return (
        <React.Fragment>
            <Frame className="stairway" title="" content={
                /*<video width={dimW-2} height={dimH} muted loop autoPlay><source src={videoDimURL} type="video/mp4"></source></video>*/
                <div>
                    <video autoPlay muted loop playsInline
                        // ref={video => { this.videoMain = video; }}
                        className={"react-player mainContent"}
                        width={w}
                        height={h}
                    >
                        <source src={window.AWS + "/waveforms/waves2_lines.mp4"} type="video/mp4" ></source>
                    </video>
                    <LiveBar x={20} y={yLive} />
                </div>
            }
                width={w} height={h} x={x} y={y}
            />

            <Frame className="doveFrame" title="" windowStyle={{ background: "transparent" }} content={
                <img src={window.AWS + "/waveforms/dove_t.gif"} width={90} height={90} />
            }
                width={90} height={90} x={doveX} y={doveY}
            />
        </React.Fragment>
    )
}