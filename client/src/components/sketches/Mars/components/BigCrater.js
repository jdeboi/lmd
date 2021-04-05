

import React from 'react';
import Frame from '../../../shared/Frame/Frame';
import { connect } from 'react-redux';

class BigCrater extends React.Component {

  constructor(props) {
    super(props);

    this.poolRef = React.createRef();
  }


  componentDidUpdate(prevProps) {
    const { ui } = this.props;
    if (ui.compositionStarted && !prevProps.ui.compositionStarted) {
      this.poolRef.current.play();
    }
  }

  render() {
    const { w, h, x, y, isFlipped, poolVid } = this.props;
    const vidC = isFlipped ? " rot90" : "";

    return (
      <Frame title="" content={
        <div className={"bigCrater" + vidC} style={{ height: `${h}px`, backgroundSize: `${w}px ${h}px` }}>
          <video
            playsInline
            className={"poolVid"}
            ref={this.poolRef}
            style={{ height: `${h}px`, width: `${w}px` }}
            autoPlay
            muted
            loop>
            <source src={poolVid} type="video/mp4" ></source>
      Your browser does not support HTML5 video.
      </video>
        </div>
      }
        width={w} height={h} x={x} y={y}
      />
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


export default connect(mapStateToProps, mapDispatchToProps())(BigCrater);

