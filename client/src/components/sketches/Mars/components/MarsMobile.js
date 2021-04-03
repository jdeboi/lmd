



import React from 'react';
import { connect } from 'react-redux';
// import { getCenterModalDim } from '../../../shared/CenterModal/Helper';
// import CenterModal from '../../../shared/CenterModal/CenterModal';
// import BabylonWaterScene from './BabylonWater';
// import SwimLane from './SwimLane';
// import PoolButtons from './PoolButtons';
import Chairs from './Chairs';
import BigCrater from './BigCrater';
// import SmallCrater from './SmallCrater';
// import Board from './Board';


// import { mapVal, constrain } from '../../../shared/Helpers/Helpers';

class MarsMobile extends React.Component {


    constructor(props) {
        super(props);


        this.poolVid0 = window.AWS + "/mars/pool/mars_0.mp4"
        this.poolVid1 = window.AWS + "/mars/pool/mars_1.mp4"
        this.poolVid2 = window.AWS + "/mars/pool/mars_2.mp4"
        this.poolVid3 = window.AWS + "/mars/pool/mars_3.mp4"

        this.state = {
            poolVid: this.poolVid1,
            isHidden: false
        }
    }


    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onHide = () => {
        this.setState({ isHidden: true })
    }

    buttonClick = (num) => {
        let vids = [this.poolVid0, this.poolVid1, this.poolVid2, this.poolVid3];
        this.setState({ poolVid: vids[num] });
    }

    render() {
        const {poolVid, isHidden} = this.state;
        const {ui} = this.props;

        let spacing = 20;
        let availW = ui.contentW - spacing*2;
        let availH = ui.contentH - spacing*2 - ui.toolbarH;

        const pool = {
            h: 640,
            w: 325,
            x: 0,
            y: 0,
            isFlipped: false
        };
        
        if (ui.orientation === "portrait") {
            // max h, setW
            pool.w = pool.w * availH/pool.h;
            pool.h = availH;
            pool.x = (ui.contentW - pool.w)/2;
            pool.y = ((ui.contentH - ui.toolbarH) - pool.h)/2; /// + ui.toolbarH;

            return (
                <BigCrater w={pool.w} h={pool.h} x={pool.x} y={pool.y} isFlipped={pool.isFlipped} poolVid={poolVid} />
            )
        }
        else {
            pool.h = 212;//pool.h * availW/pool.w;
            pool.w = availW;
            pool.x = (ui.contentW - pool.w)/2;
            pool.y = ((ui.contentH - ui.toolbarH) - pool.h)/2 //+ ui.toolbarH;
            pool.isFlipped = true;
            return (
                <Chairs w={pool.w} h={pool.h} x={pool.x} y={pool.y} factor={1} />
            )
        }

        
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


export default connect(mapStateToProps, mapDispatchToProps())(MarsMobile);

