
import React from 'react';
import LiveBar from './LiveBar';
import Frame from '../../../../shared/Frame/Frame';

import { connect } from 'react-redux';


class PearlyGates extends React.Component {

    constructor(props) {
        super(props);
        this.pearlyVid = React.createRef();
    }

    componentDidUpdate(prevProps) {
        const { ui } = this.props;
        if (ui.compositionStarted && !prevProps.ui.compositionStarted) {
            this.pearlyVid.current.play();
        }
    }

    render() {
        const { w, h, x, y } = this.props;
        const doveX = x + w / 2 - 45;
        const doveY = y + h / 2 - 45;
        let yLive = h - 55;
        if (h < 400)
            yLive = h - 35;

        // this.pearlyVid = React.createRef();

        return (
            <React.Fragment>
                <Frame className="stairway" title="" content={
                    /*<video width={dimW-2} height={dimH} muted loop autoPlay><source src={videoDimURL} type="video/mp4"></source></video>*/
                    <div>
                        <video
                            ref={this.pearlyVid}
                            autoPlay
                            muted
                            loop
                            playsInline
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

}


const mapStateToProps = (state) => {
    return {
        ui: state.ui
    }
}

const mapDispatchToProps = () => {
    return {
    }
}


export default connect(mapStateToProps, mapDispatchToProps())(PearlyGates);

