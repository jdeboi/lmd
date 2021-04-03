import React from 'react';
import './Pulse.css';
import Frame from '../../../../shared/Frame/Frame';


export default class Pulse extends React.Component {

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        const w = 300;
        const h = 90;
        const x = 200;
        const y = 200;
        const { heartRate, ui } = this.props;

        let hr = Math.floor(heartRate);
        if (hr > 40)
            hr = Math.floor(heartRate / 5) * 5;


        return (
            <Frame title="" content={
                <div className="Pulse">
                    <div className="heartRate">{hr}</div>
                    <div className="bpm">
                        <div>BPM</div>
                        <div>❤️</div>
                    </div>
                </div>
            }
                width={w} height={h} x={x} y={y}
            />
        )
    }


}