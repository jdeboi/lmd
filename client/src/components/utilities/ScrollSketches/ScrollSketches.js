import React from 'react';
import { withRouter } from "react-router-dom";

// store
import { connect } from 'react-redux';
import { loadingApp } from '../../../store/actions';

// sketches
import MacbookAir from '../../sketches/MacbookAir/MacbookAir';
import JungleGyms from '../../sketches/JungleGyms/JungleGyms';
import HardDrives from '../../sketches/HardDrives/HardDrives';
import Mars from '../../sketches/Mars/Mars';
import WetStreams from '../../sketches/WetStreams/WetStreams';
import Confessional from '../../sketches/Confessional/Confessional';


class ScrollSketches extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSketch: 0
        };
    }


    componentDidMount() {
        this.interval = setInterval(this.changeSketch, 8000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeSketch = () => {
        this.setState({currentSketch: (this.state.currentSketch+1)%6});
    }

    render() {
        // const counter = useSelector(state => state.counterReducer);
        // console.log(counter);
        const { ui, addClass, removeClass } = this.props;
        const { currentSketch } = this.state;

        return (
            <React.Fragment>
                {currentSketch === 0 ? < MacbookAir /> : null}
                {currentSketch === 1 ? < JungleGyms /> : null}
                {currentSketch === 2 ? < HardDrives /> : null}
                {currentSketch === 3 ? <Mars addClass={addClass} removeClass={removeClass} /> : null}
                {currentSketch === 4 ? < WetStreams /> : null}
                {currentSketch === 5 ? < Confessional /> : null}
            </React.Fragment>
        );
    }


}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        ui: state.ui
    }
}

const mapDispatchToProps = () => {
    return {
        loadingApp,
    }
}
//

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(ScrollSketches));
