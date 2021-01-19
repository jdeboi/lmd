
import React from 'react';
import Frame from '../../../../shared/Frame/Frame';
import './ConfessForm.css';

export default class ConfessionFormContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timePeriod: "days",
            prayTo: "Kanye"
        }
    }

    handleTimeChange = (event) => {
        this.setState({ timePeriod: event.target.value });
    };

    handlePrayChange = (event) => {
        this.setState({ prayTo: event.target.value });
    };

    render() {
        const { w, h, x, y, onSubmit } = this.props;
        if (onSubmit) {
            var line0 = (
                <div className="line0 lineSp">
                    <div className="text-line0">Bless me</div>
                    <select className="confessional-box" value={this.state.prayTo} onChange={this.handlePrayChange}>
                        <option value="RBG">RBG</option>
                        <option value="Father">Father</option>
                        <option value="Mitch McConnel">Mitch McConnel</option>
                        <option value="Kanye">Kanye</option>
                    </select>
                </div>
            )
        }
        else {
            var line0 = (
                <React.Fragment>
                    <div className="lineSp">Bless me</div>
                    <select className="lineSp confessional-box" value={this.state.prayTo} onChange={this.handlePrayChange}>
                        <option value="RBG">RBG</option>
                        <option value="Father">Father</option>
                        <option value="Mitch McConnel">Mitch McConnel</option>
                        <option value="Kanye">Kanye</option>
                    </select>
                </React.Fragment>
            )
        }

        return (

            <div className="confessional">
                {line0}
                <div className="lineSp">for I have sinned. It has been:</div>

                <div className="confessional-time lineSp">
                    <div className="confessional-box">
                        <input type="number" placeholder="number" />
                    </div>

                    <select className="confessional-box" value={this.state.timePeriod} onChange={this.handleTimeChange}>
                        <option value="days">days</option>
                        <option value="months">months</option>
                        <option value="years">years</option>
                        <option value="never">never</option>
                    </select>
                </div>
                <div className="lineSp">since I last went to confession.</div>
                <div className="txt-box">
                    <div className="multitext confessional-box">
                        <textarea
                            id="outlined-multiline-static"
                            label=""
                            multiline="true"
                            placeholder="confession"
                            className="box text-line2"
                        />
                    </div>
                </div>
                {onSubmit ? <button className="confessional-box" onClick={onSubmit}>submit</button> : null}
            </div>

        )
    }
}