import React from 'react';
// import Frame from '../Frame/Frame';
import './Exit.css';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import DesktopIcon from '../DesktopIcon/DesktopIcon';


class Exit extends React.Component {

  constructor(props) {
    super(props);

  }
  // componentDidMount() {
  // }

  // componentWillUnmount() {
  // }

  render() {
    const { user, ui } = this.props;
    if (user.room === "gallery")
      return null;
    const y = 75;
    const x = 20; //this.props.ui.width - 110;
    const box = { w: 10, h: 10, x: 10, y: 10 };
    // const iconArrow = "fas fa-arrow-circle-left";
    // const iconArrow = "fas fa-arrow-left";
    // const icon = "fas fa-window-close";
    // const icon = "fas fa-home";
    // 
    // const icon = "fas fa-door-open";
    var imgW = 60;
    if (ui.hasFooter)
      imgW = 44;
    return (
      //  <button className="backButton" style={{left: x, top: y}}><i class={iconArrow}></i></button>
      // <Link className="backButton" style={{left: x, top: y}} to="/"><div /></Link>
      <DesktopIcon title={"gallery"} x={x} y={y} bounded={false} box={box} onDblClick={this.onDblClick}
        content={
          <img src={window.AWS + "/shared/homeicon.png"} width={imgW} height={imgW} />
        } frameContent={<div></div>}
      />
    )
  }

  onDblClick = () => {
    if (window.confirm('Go back to main gallery?')) {
      this.props.history.push("/");
    }
  }

  // getFrame = () => {
  //   const {x, y, ui} = this.props;
  //   let y = y ? y : (ui.height - 26 - 40 - 70);
  //   let x = x ? x : (ui.width - 100 - 30);
  //   return (
  //     <Frame
  //       className="exitFrame"
  //       content={<div className="exitImg"></div>}
  //       width={100}
  //       height={100}
  //       x={x}
  //       y={y}
  //     />
  //   )
  // }

}


const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    user: state.user
  }
}

const mapDispatchToProps = () => {
  return {
  }
}
//

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(Exit));

