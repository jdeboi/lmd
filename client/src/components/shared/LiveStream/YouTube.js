
import React from 'react';
// import './Volume.css';
import Frame from '../Frame/Frame';

import { connect } from 'react-redux';
import { hideVolume } from '../../../store/actions/menuItems';

class YouTube extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    // componentDidUpdate(prevProps) {
    // }

    onHide = () => {

    }

    render() {
        const fraction = 200/315;
        const w = Math.floor(560*fraction);
        const h = Math.floor(315*fraction);
        const { music, ui, setVolume } = this.props;
        const style = { height: 20, width: w - ui.edgeSpacing };

        return (
            <Frame title="live stream"
                bounded={true}
                isHidden={this.props.menu.isVolumeHidden}
                onHide={this.props.hideVolume}
                className="Live-Stream"
                windowStyle={{ background: "rgba(0, 0, 0, .9)" }}
                content={
                    <iframe width={w} 
                    height={h} 
                    src="https://www.youtube.com/embed/jogQMOumsWs" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>

                    </iframe>

                }
                width={w} height={h} x={ui.edgeSpacing} y={ui.contentH-h-ui.edgeSpacing} z={1000}
            />
        );
    }


}


const mapStateToProps = (state) => {
    return {
        ui: state.ui,
        menu: state.menu
    }
}

const mapDispatchToProps = () => {
    return {
        hideVolume
    }
}


export default connect(mapStateToProps, mapDispatchToProps())(YouTube);
