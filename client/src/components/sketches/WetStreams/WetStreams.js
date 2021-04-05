import React from 'react';
import "./WetStreams.css";

///////////////////// p5.js
import P5Wrapper from 'react-p5-wrapper';
import sketch from './wetSketch';

import Shower from './components/Shower';
import { connect } from 'react-redux';
import {setSketchMusic} from '../../../store/actions/music';

// import {getNewZIndices} from '../../shared/Helpers/Helpers';
// import Stair from './Stair';

// import Glasses from '../../shared/Glasses/Glasses';

class WetStreams extends React.Component {

  constructor(props) {
    super(props);

    // this.spacing = 15;
    // const availH = window.innerHeight -34 -2*26-3*this.spacing;
    // const dim = 300; //Math.max(availH/2, 300);
    this.spacing = 15; //(window.innerHeight -30 -2*26-dim*2)/3;
    // if (this.props.ui.contentW > 1500)
    //   this.spacing = 60;
    this.state = {
      deltaPositions: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 }
      ],
      playingStreams: [true, true, true, true, true, true],
      isMinimized: [false, false, false, false, false, false],
      isClosed: [false, false, false, false, false, false],
      // zIndices: [0, 1, 2, 3, 4, 5]
    }
  }


  componentDidMount() {
    // this.updateDimensions();
    // window.addEventListener("resize", this.updateDimensions.bind(this));
    this.interval = setInterval(this.playStreamReset, 4000);
    // this.props.userSetRoom("wet-streams");
    this.props.setSketchMusic("wetStreams", 0, .6);
  }

  componentWillUnmount() {
    // window.removeEventListener("resize", this.updateDimensions.bind(this));
    clearInterval(this.interval);
    // this.props.userLeaveRoom("wet-streams");
  }

  // updateDimensions() {
  //   let showerFrame = {...this.state.showerFrame};
  //   showerFrame.x = (window.innerWidth-showerFrame.w*3 - this.spacing*2)/2
  //   showerFrame.y = Math.max((window.innerHeight -34 -2*26-showerFrame.h*2-this.spacing)/2, this.spacing)

  //   this.setState({ showerFrame, windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  // }

  playStreamReset = () => {
    const playingStreams = [...this.state.playingStreams];
    for (let i = 0; i < playingStreams.length; i++) {
      playingStreams[i] = Math.random() > .4;
    }
    this.setState({ playingStreams })
  }

  // newFrameToTop = (id) => {
  //   const newZ = getNewZIndices(id, this.state.zIndices);
  //   this.setState({zIndices: newZ});
  //   // console.log("ZZZ", this.state.zIndices);
  // }

  onMinimized = (id) => {
    let dps = [...this.state.isMinimized];
    dps[id] = !dps[id];
    this.setState({ isMinimized: dps });
  }

  onClosed = (id) => {
    let dps = [...this.state.isClosed];
    dps[id] = true;
    this.setState({ isClosed: dps });
  }

  onMaximized = (id) => {
    let dps = [...this.state.deltaPositions];
    let dp = { ...dps[id] };
    dp.x = 0;
    dp.y = 0;
    dps[id] = dp;
    this.setState({ deltaPositions: dps });
  }


  handleDrag = (index, ui) => {
    let dx = ui.deltaX;
    let dy = ui.deltaY;
    // 1. Make a shallow copy of the items
    let dps = [...this.state.deltaPositions];
    // 2. Make a shallow copy of the item you want to mutate
    let dp = { ...dps[index] };
    // 3. Replace the property you're intested in
    dp.x += dx;
    dp.y += dy;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    dps[index] = dp;
    // 5. Set the state to our new copy
    // this.newFrameToTop(index);
    this.setState({ deltaPositions: dps });
  };


  render() {
    let { playingStreams, deltaPositions, isMinimized, isClosed } = this.state;
    const { ui } = this.props;
    let dim = 300;
    if (ui.hasFooter || ui.isMobile) {
      if (ui.orientation === "portrait") {
        let dimW = (ui.width - this.spacing * 3)/2;
        let dimH = (ui.height - 3* (this.spacing + ui.toolbarH) - this.spacing - 2*ui.headerH)/3;
        dim  = Math.min(dimW, dimH);
      }
      else {
        let dimW = (ui.width - this.spacing * 4 - 60)/3;
        let dimH = (ui.height - 2* (this.spacing + ui.toolbarH) - this.spacing - ui.headerH)/2;
        dim  = Math.min(dimW, dimH);
      }
     
    }
    else if (ui.contentW > 2000) {
      dim = 370;
    }
    const showerFrame = {
      w: dim,
      h: dim
    };
    let origins = [];

    if ((ui.isMobile || ui.hasFooter) && ui.orientation === "portrait") {
      showerFrame.x = (ui.width - this.spacing - 2*dim) / 2; // space = dim = space = dim = space
      // console.log(dim, 165*2+this.spacing*3, ui.width)
      // header = space = dim+tool = space = dim+tool = space = dim+tool = space = footer
      showerFrame.y = (ui.height - ui.headerH*2 - 3*(dim + this.spacing+ui.toolbarH) - this.spacing)/2 + 15;
      for (let i = 0; i < 2; i++) {
        origins[i] = { x: showerFrame.x + i * (showerFrame.w + this.spacing), y: showerFrame.y };
        origins[2+i] = { x: showerFrame.x + i * (showerFrame.w + this.spacing), y: showerFrame.y + showerFrame.h + this.spacing + ui.toolbarH };
        origins[4+i] = { x: showerFrame.x + i * (showerFrame.w + this.spacing), y: showerFrame.y + (showerFrame.h + this.spacing + ui.toolbarH)*2 };
      }
    }
    else {
      showerFrame.x = (ui.width - 3 * (dim + this.spacing) - this.spacing) / 2;
      showerFrame.y = Math.max((ui.height - ui.headerH - 2 * ui.toolbarH - dim * 2 - this.spacing) / 2, this.spacing);
      
      if ((ui.isMobile || ui.hasFooter) && ui.orientation === "landscape" ) {
        // showerFrame.x = this.spacing;
        showerFrame.y = (ui.height - ui.headerH - 2*(dim +ui.toolbarH) - this.spacing)/2;
      }
      for (let i = 0; i < 3; i++) {
        origins[i] = { x: showerFrame.x + i * (showerFrame.w + this.spacing), y: showerFrame.y };
        origins[i + 3] = { x: showerFrame.x + i * (showerFrame.w + this.spacing), y: showerFrame.y + showerFrame.h + this.spacing + ui.toolbarH };
      }
    }

   
    

    const showWater = [];
    for (let i = 0; i < playingStreams.length; i++) {
      showWater[i] = playingStreams[i] && !isMinimized[i] && !isClosed[i];
    }

    let bgimg = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/wetStreams/blk2000.png";
    if (ui.contentW > 2000)
      bgimg = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/wetStreams/bigGrid2.png";

    return (
      <div className="WetStreams Sketch" style={{backgroundImage: `url(${bgimg})`}}>

        {origins.map((origin, i) => {
          const props = {
            isPlaying: playingStreams[i] && !isMinimized[i],
            x: origin.x,
            y: origin.y,
            // z: zIndices[i],
            w: showerFrame.w,
            h: showerFrame.h,
            id: i,
            dim: dim,
            handleDrag: this.handleDrag,
            onMaximized: this.onMaximized,
            onMinimized: this.onMinimized,
            onClosed: this.onClosed
          }
          return <Shower key={i} {...props} />
        })};


        <P5Wrapper className="p5sketch" sketch={sketch}
          origins={origins}
          scaler={showerFrame.w / 400}
          deltas={deltaPositions}
          isPlaying={showWater}
        />

      </div>
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
    // doneLoadingApp
    setSketchMusic
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(WetStreams);


