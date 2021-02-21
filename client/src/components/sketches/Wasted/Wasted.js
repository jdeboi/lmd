import React from 'react';
import Frame from '../../shared/Frame/Frame';
// import FrameSimple from '../../shared/Frame/FrameSimple';
import './Wasted.css';

// store
import { connect } from 'react-redux';
// import { doneLoadingApp } from '../../../store/actions/';

class Wasted extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.startTime = 0;

    this.state = {
      currentFrame: 14,
      increasing: true,
      currentText: "wasted"
    }

    this.gridNum = 8;
    this.setFrame = this.setFrame.bind(this);
    this.setText = this.setText.bind(this);
    this.heightBuffer = 70;


    this.words = ["wasted", "days", "are", "days", "wasted"];

  }


  componentDidMount() {
    this.startTime = new Date();
    this.intervalFrames = setInterval(this.setFrame, 200);
  }

  componentWillUnmount() {
    clearInterval(this.intervalFrames);
  }

  setText() {
    var wordIndex = Math.floor((this.state.currentFrame + 1) / 2);
    if (wordIndex >= this.words.length) wordIndex = this.words.length - 1;
    else if (wordIndex < 0) wordIndex = 0;
    var word = this.words[wordIndex];
    if (word) word = word.toUpperCase();
    this.setState({ currentText: word });
  }

  setFrame() {
    var fr = this.state.currentFrame;
    if (this.state.increasing) {
      fr++;
      if (fr > this.gridNum) {
        fr = this.gridNum;
        this.setState({ increasing: false });
      }
    } else {
      fr--;
      if (fr < -2) {
        fr = -1;
        this.setState({ increasing: true });
      }
    }
    this.setState({ currentFrame: fr });
    this.setText();
  }

  render() {
    const { ui } = this.props;
    var fs = ui.width / 10;
    if (fs > 180) fs = 180;

    var grids = [];
    for (var i = 0; i < this.gridNum; i++) {
      grids.push(i);
    }

    // const bkImg = window.AWS + "/three/3D/alps.jpg";
    const bkStyle = {};
    // bkStyle.backgroundImage = 'url(' + bkImg + ')';

    return (
      <div className="Spacetimes Sketch" style={bkStyle}>
        { <div className="palindrome" style={{ visibility: "visible", fontSize: fs }}>{this.state.currentText}</div>}


        {grids.map((i) => {
          let factor = ui.width / 1000;
          if (factor > 1.5) factor = 1.5;
          if (factor < .8) factor = .5;
          const val = (980 - 100 * i) * factor;
          const x = ui.width / 2 - val / 2;
          const y = (ui.height - this.heightBuffer) / 2 - val / 2;
          let title = this.words[(7 - i) % (this.words.length - 1)];

          // console.log(windowHeight, y, val);
          if (val < 150) title = "...";

          return (<GridFrame
            title={title}
            isMinimized={false}
            isHidden={this.state.currentFrame < i ? true : false}
            dimW={val}
            dimH={val}
            key={i}
            // src={bkImg}
            src={ window.AWS+"/spacetimes/parrot.png"}
            dimX={x}
            dimY={y}
          />);

        }

        )}
      </div>
    );
  }

}

function GridFrame(props) {
  return (
    <Frame title={props.title}
      isMinimized={props.isMinimized}
      isHidden={props.isHidden}
      content={
        <img
          className={"grid-img"}
          width={props.dimW + "px"}
          height={props.dimW + "px"}
          src={props.src}
          alt="3d grid background"
        />
      }
      width={props.dimW} height={props.dimW} x={props.dimX} y={props.dimY}
    />
  )

}


const mapStateToProps = (state) => {
  return {
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    // doneLoadingApp
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Wasted);
