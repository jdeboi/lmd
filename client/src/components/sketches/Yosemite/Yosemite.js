import React from 'react';
import { connect } from 'react-redux';
import Frame from '../../shared/Frame/Frame';
import DesktopIcon from '../../shared/DesktopIcon/DesktopIcon';
// import Dock from '../../shared/Dock/Dock';
import { setSketchMusic, setSketchVolume, setSong } from '../../../store/actions/music';
import { mapVal, constrain, randomInRange } from '../../shared/Helpers/Helpers';
import './Yosemite.css';

class Yosemite extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.state = {
      numPops: 0,
      popTime: 3000,
      hasStarted: false,
      popups: this.getPopUps(),
      numFrames: 0,
      popW: 80
    }

    this.start = new Date();
  }


  componentDidMount() {

    // this.popInterval = setTimeout(this.popUp, 4000);
    this.popInterval = setTimeout(this.startPop, 9000);
    this.props.setSketchMusic("yosemite", 1, 0);
  }

  componentWillUnmount() {
    if (this.popInterval)
      clearInterval(this.popInterval)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ui.compositionStarted !== this.props.ui.compositionStarted) {
      this.popInterval = setTimeout(this.startPop, 4000);
    }
  }

  startPop = () => {
    if (!this.state.hasStarted) {
      this.setState({ hasStarted: true }, this.popUp);
    }
  }

  popUp = () => {

    const { ui } = this.props;
    let t = this.state.popTime - 200;
    let minT = 300;
    if (t < minT)
      t = minT;

    let numPop = this.state.numPops + 1;
    numPop %= this.state.popups.length;
    let popW = constrain(this.state.popW + 10, 0, 3000);

    const popups = [...this.state.popups];
    let pop = { ...popups[numPop] };
    pop.isHidden = false;
    // pop.w += 20;
    pop.w = popW;
    pop.x = randomInRange(0, ui.width - pop.w);
    let bottom = ui.contentH;
    let yMax = bottom - pop.w - 30;
    let yMin = 60;
    pop.y = randomInRange(yMin, yMax);
    popups[numPop] = pop;
    this.setState({ numPops: numPop, popTime: t, popups, popW })

    // let blazeVal = 300;
    // let vol = mapVal(popW, 0, blazeVal, 0, 1);
    // if (popW > blazeVal) {
    //   if (this.props.music.currentSong === 0) 
    //     this.props.setSong(1);
    //   vol = mapVal(popW, blazeVal, 1000, .1, 1);
    // }
    let vol = mapVal(popW, 80, 300, 0, 1);
    vol = constrain(vol, 0, 1);

    this.props.setSketchVolume(vol);
    this.popInterval = setTimeout(this.popUp, t);

  }

  onHide = (id) => {
    const popups = [...this.state.popups];
    let pop = { ...popups[id] };
    pop.isHidden = true;
    popups[id] = pop;
    this.setState({ popups })
  }

  getPopUps = () => {
    const { ui } = this.props;
    let numPops = constrain(ui.width / 30, 20, 60);
    let maxS = mapVal(ui.width, 300, 5120, 130, 800);
    maxS = constrain(maxS, 130, 500);
    let minS = mapVal(ui.width, 300, 5120, 80, 130);
    minS = constrain(minS, 80, 130);
    let popups = [];
    for (let i = 0; i < numPops; i++) {

      // let z = randomInRange(0, numPops);

      // let w = mapVal(z, 0, numPops, minS, maxS);
      // w = Math.floor(w);
      let w = 80;//Math.floor(maxS);
      let x = randomInRange(0, ui.width - w);
      let bottom = ui.contentH;
      // if (ui.hasFooter && ui.orientation === "portrait")
      //   bottom = ui.contentH - 60;
      let yMax = bottom - w - 30;
      // let yMin = Math.min(yMax - 100, bottom * .75);
      let yMin = 60;
      let y = randomInRange(yMin, yMax);
      let z = i;
      let isHidden = true;
      let classN = "";
      popups.push({ x, y, z, w, isHidden, classN });
    }
    return popups;
  }

  render() {

    // console.log(this.state.numPops)
    let i = 0;
    var box = { x: 100, y: 100, w: 300, h: 200 };

    return (
      <React.Fragment>
        <div className="Sketch Yosemite">

          {
            this.state.popups.map((pop, i) => {
              // console.log(i);
              return (
                <Frame
                  windowStyle={{ background: "rgba(0, 0, 0, .3)" }}
                  content={
                    <div className="fyre" ></div>
                  }
                  key={i}
                  onHide={() => this.onHide(i)}
                  isHidden={pop.isHidden}
                  bounded={true}
                  width={pop.w}
                  height={pop.w}
                  // title={i === this.state.numPops?"ALERT":""}
                  // className={i === this.state.numPops?"fire":""}
                  className="fire"
                  x={pop.x}
                  y={pop.y}
                  z={i === this.state.numPops ? this.state.popups.length : i}
                />
              );

            })
          }
          <DesktopIcon
            disableWindow={true}
            onDblClick={() => this.onDblClick(0)}
            x={this.props.ui.contentW - 150}
            y={100}
            width={83}
            height={90}
            box={box}
            title={"home"}
            content={
              <img src={window.AWS + "/shared/homeicon.png"} width={80} height={80} />
            }
            frameContent={
              <div className="test">home</div>
            }
          />

          {this.getFrames()}
          {/* <DesktopIcon
            title={"home"}
            x={this.props.ui.width - 140}
            y={100}
            bounded={false}
            box={box}
            content={
              <img src={window.AWS + "/shared/homeicon.png"} width={80} height={80} />
            }
            frameContent={<div></div>}
          /> */}

        </div>
        {/* <Dock showDock={true} /> */}
      </React.Fragment>
    )
  }

  getFireH = () => {
    let startW = 80;
    let endW = 400;
    if (this.props.width < 500)
      endW = 80;
    else if (this.props.width < 800)
      endW = 200;
    return constrain(mapVal(new Date() - this.start, 0, 20000, startW, endW), startW, endW);
  }

  onDblClick = (i) => {
    console.log(i);
    let { numFrames } = this.state;
    numFrames++;
    this.setState({ numFrames });
  }


  clicked = (id) => {
    // console.log("clicked")
    this.setState({ numFrames: this.state.numFrames + 1 });
  }

  getFrames = () => {
    const { numFrames } = this.state;
    const { ui } = this.props;
    let frames = [];
    for (let i = 0; i < numFrames; i++) {
      frames[i] = i;
    }

    //"backups_failed","autosaves_disabled",
    // let docNames = [["home"], ["timelines","documents"], ["portfolio","receipts"],["moments","portraits","selfies", "landcapes"], ["browsing_history","auto_saves"],["close_ups", "nudes"]]
    // let docNames = ["can_t","remix","burnt","shit"]
    return (
      <div className="openedFrames">
        {frames.map((frame, i) => {
          let framesW = 20;
          let startX = 100;
          if (ui.contentW < 500) {
            framesW = 5;
            startX = 20;
          }

          let direction = Math.floor(frame / framesW);

          let x = 0;
          if (direction % 2 == 0) x = startX + frame % framesW * 20;
          else x = startX + framesW * 20 - frame % framesW * 20;

          // let t0 = docNames[i % docNames.length];
          // let t1 = docNames[(i + 1) % docNames.length]

          let src = window.AWS + '/loop/folder.png';
          // if (new Date() - this.start > i * 4000)
          //   src = window.AWS + '/yosemite/fireemoji.png';

          //docNames[(i)%docNames.length]
          //docNames[(i+1)%docNames.length
          return (
            <Frame
              handle={".App"}
              key={frame}
              // bounded={true}
              x={x}
              y={100 + frame * 20}
              width={300}
              height={150}
              title={""}
              windowStyle={{ background: "white" }}
              content={
                <div className="burned-folders">
                  {this.getFolderList(["backup_" + (i + 1)], this.props.ui.isMobile, frame)}
                </div>
              }
            />
          )
        })}
      </div>
    )

  }

  getFolderList = (titles, isMobile, frame) => {
    return (

      titles.map((title, i) => {
        if (isMobile) {
          return (
            <div className="folder-item" key={i} onClick={(event) => this.clicked(frame)}>
              <div className="folder-img" />
              <div className="folder-title">{title}</div>
            </div>
          )
        }
        return (
          <div className="folder-item" key={i} onDoubleClick={(event) => this.clicked(frame)}>
            <div className="folder-img" />

            <div className="folder-title">{title}</div>
          </div>

        )
      })

    )

  }

}



const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    music: state.music
  }
}

const mapDispatchToProps = () => {
  return {
    setSketchMusic,
    setSketchVolume,
    setSong
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Yosemite);

