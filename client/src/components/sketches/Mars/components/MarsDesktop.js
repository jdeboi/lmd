



import React from 'react';
import { connect } from 'react-redux';

import BabylonWaterScene from './BabylonWater';
import SwimLane from './SwimLane';
import PoolButtons from './PoolButtons';
import Chairs from './Chairs';
import BigCrater from './BigCrater';
import SmallCrater from './SmallCrater';
import Board from './Board';

import { mapVal, constrain } from '../../../shared/Helpers/Helpers';

class MarsDesktop extends React.Component {


    constructor(props) {
        super(props);


        this.poolVid0 = window.AWS + "/mars/pool/mars_0.mp4"
        this.poolVid1 = window.AWS + "/mars/pool/mars_1.mp4"
        this.poolVid2 = window.AWS + "/mars/pool/mars_2.mp4"
        this.poolVid3 = window.AWS + "/mars/pool/mars_3.mp4"

        this.state = {
            poolVid: this.poolVid1
        }
    }


    componentDidMount() {
        this.props.addClass("overflow-all");
    }

    componentWillUnmount() {
        this.props.removeClass("overflow-all");
    }


    buttonClick = (num) => {
        let vids = [this.poolVid0, this.poolVid1, this.poolVid2, this.poolVid3];
        this.setState({ poolVid: vids[num] });
    }


    render() {

        const spacing = 25;

        const { ui } = this.props;
        let width = window.innerWidth;
        // let height = window.innerHeight;
        let maxW = 1.6
        this.factor = mapVal(width, 1440, 2560, 1, maxW);
        this.factor = constrain(this.factor, .6, maxW);

        // have to make sure the height isn't maxed out for really wide screens
        this.factor = 1;

        const sketchW = 1225 * this.factor + 2 * spacing;
        const sketchH = 640 * this.factor;

        const startX = Math.max((width - sketchW) / 2, spacing);

        // isn't from start of header bar b/c overflow all
        const startY = ui.headerH + (ui.contentH - (sketchH + ui.toolbarH)) / 2;
        //(height-sketchH-ui.toolbarH)/2;//Math.max((height - sketchH + 34) / 2, spacing);


        const pool = {
            x: startX,
            h: 640 * this.factor,
            y: startY,
            w: 0
        };
        pool.w = 548 / 1080 * pool.h;

        const chairs = {
            w: 600 * this.factor,
            h: 200 * this.factor,
            x: pool.x + pool.w + spacing,
            y: pool.y
        };
        const smallCrater = {
            w: 300 * this.factor,
            h: 300 * this.factor,
            x: chairs.x + chairs.w + spacing,
            y: pool.y
        };
        const bab = {
            w: chairs.w,//500,
            h: pool.h - chairs.h - spacing - ui.toolbarH,
            y: chairs.y + chairs.h + ui.toolbarH + spacing,
            x: pool.x + pool.w + spacing//chairs.x + chairs.w - 500
        };
        const board = {
            w: 500 * this.factor,
            h: 152 * this.factor,
            x: smallCrater.x + smallCrater.w - 500 * this.factor,
            y: pool.y + pool.h - 152 * this.factor
        };
        const swimLaneFrame = {
            w: 80 * this.factor,
            h: 36 * 8.8 * this.factor,//bab.h,
            x: bab.x + 30,//pool.x + pool.w + spacing,
            y: bab.y + 50//chairs.y + chairs.h + toolbarH + spacing
        };

        const tank = {
            w: smallCrater.w,
            h: pool.h - smallCrater.h - board.h - 2 * ui.toolbarH - 2 * spacing,
            x: smallCrater.x,
            y: smallCrater.h + smallCrater.y + ui.toolbarH + spacing
        }

        const { poolVid } = this.state;

        return (
            <React.Fragment>
                <div className="Mars-Desktop">
                    <BigCrater w={pool.w} h={pool.h} x={pool.x} y={pool.y} poolVid={poolVid} />
                    <SmallCrater w={smallCrater.w} h={smallCrater.h} x={smallCrater.x} y={smallCrater.y} factor={this.factor} />
                    <PoolButtons w={tank.w} h={tank.h} x={tank.x} y={tank.y} factor={this.factor} buttonClick={this.buttonClick} />
                    <Chairs w={chairs.w} h={chairs.h} x={chairs.x} y={chairs.y} factor={this.factor} />
                    <BabylonWaterScene w={bab.w} h={bab.h} x={bab.x} y={bab.y} />
                    <Board w={board.w} h={board.h} x={board.x} y={board.y} factor={this.factor} />
                    <SwimLane w={swimLaneFrame.w} h={swimLaneFrame.h} x={swimLaneFrame.x} y={swimLaneFrame.y} />
                </div>
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


export default connect(mapStateToProps, mapDispatchToProps())(MarsDesktop);

