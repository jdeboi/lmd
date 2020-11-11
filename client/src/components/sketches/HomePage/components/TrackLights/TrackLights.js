import React from 'react';
import Frame from '../../../../shared/Frame/Frame';
import './TrackLights.css';

class TrackLights extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lightsOn: true
    }
  }

  toggleLights = () => {
    this.setState(prevState => ({
      lightsOn: !prevState.lightsOn
    }));
  }

  render() {
    return (
      <div className="TrackLights">
        {this.getTrackLights()}
      </div>
    )
  }

  getTrackLights = () => {
    if (this.props.isHorizontal) {
      return this.getHorizLights();
    }
    return this.getVertLights();
  }

  getSwitch = () => {
    return(
      <div className="switch" >
        <input type="checkbox" id="lightsOnInput" onChange={this.toggleLights} name="lightsOn" checked={this.state.lightsOn} />
        <span className="slider"></span>
      </div>
    )
  }

  getHorizLights = () => {
    const bsOn = `${this.props.isFlipped?"40":"-40"}px 40px 40px #ffffff`;
    const bsOff = "0px 0px 20px #000000";
    const windowStyle = {boxShadow: (this.state.lightsOn?bsOn:bsOff),backgroundColor: "white"};
    return (
      <Frame className={this.state.lightsOn?"lightsOn":"lightsOff"} title="" windowStyle={windowStyle} content={
          <div className="lightBar barHoriz">
            <div className={"lights" + (this.props.isFlipped?" flippedX":"")}></div>
            {this.getSwitch()}
          </div>
        }
        width={this.props.w} height={this.props.h} x={this.props.x} y={this.props.y} z={this.props.z} bounded={false}
        />
    )

  }

  getVertLights = () => {
    const bsOn = `${this.props.isFlipped?"-40":"40"}px 40px 40px #ffffff`;
    const bsOff = "0px 0px 20px #000000";
    const windowStyle = {boxShadow: (this.state.lightsOn?bsOn:bsOff),backgroundColor: "white"};
    return (
      <Frame className={this.state.lightsOn?"lightsOn":"lightsOff"} title="" windowStyle={windowStyle} content={
          <div className="lightBar barVert">
            <div className={"lights" + (this.props.isFlipped?"":" flippedX")}></div>
            {this.getSwitch()}
          </div>
        }
        width={this.props.w} height={this.props.h} x={this.props.x} y={this.props.y} z={this.props.z} bounded={false}
        />
    )

  }

}

export default TrackLights;
