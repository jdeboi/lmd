import React from 'react';
import Frame from '../../../shared/Frame/Frame';


class SwimLane extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      swimmerPos: [{y:3, dir:1}, {y:2, dir:-1}]
    }

    this.numSwimmers = Math.ceil(this.props.h/36.9);


    this.getSwimmerLanes = this.getSwimmerLanes.bind(this);
    this.changeSwimLane = this.changeSwimLane.bind(this);

  }


  componentDidMount() {
    this.swimInterval = setInterval(this.changeSwimLane, 400);
  }

  componentWillUnmount() {
    clearInterval(this.swimInterval);
  }

  render() {
    const {w, h, x, y} = this.props;

    return (
      <Frame title="" content={
        <div className="umbrellas">
        {this.getSwimmerLanes()}
        <div className="waterCover"></div>
        </div>
      }
      width={w} height={h} windowStyle={{background: "black"}} x={x} y={y}
      />
    )
  }

  changeSwimLane = () => {

    const swimmerPos = [...this.state.swimmerPos];
    for (let i = 0; i < swimmerPos.length; i++) {
      const swimmer = {...swimmerPos[i]};
      if (swimmer.dir === 1) {
        swimmer.y++;
        if (swimmer.y >= this.numSwimmers) {
          swimmer.y = this.numSwimmers-1;
          swimmer.dir = -1;
        }
      }
      else {
        swimmer.y--;
        if (swimmer.y < 0) {
          swimmer.y = 0;
          swimmer.dir = 1;
        }

      }
      swimmerPos[i] = swimmer;
    }

    this.setState({swimmerPos});
  }

  getSwimmerLanes = () => {
    const swimmerPos = [...this.state.swimmerPos];
    const y0 = swimmerPos[0].y;
    // const dir0 = swimmerPos[0].dir;
    const y1 = swimmerPos[1].y;
    // const dir1 = swimmerPos[1].dir;
    const lanes = [];
    for (let i = 0; i < this.numSwimmers; i++) {
      lanes[i] = i;
    }
    return (
      <div className="lanes">
      {lanes.map((i) => {
        let lane0 = "";
        let lane1 = "";
        let lane0Class ="water";
        let lane1Class="water";
        if (i === y0) {
          lane0=<img alt="woman swimming emoji" height={40} width={40} src={window.AWS+"/mars/womanswim.png"} />;
          // if (dir0 === 1) lane0Class="rot";
          // else lane0Class="rotNeg90";
        }
        if (i === y1) {
          lane1=<img alt="man swimming emoji" height={40} width={40} src={window.AWS+"/mars/manswim.png"} />;
          // if (dir1 === 1) lane1Class="rot90";
          // else lane1Class="rotNeg90";
        }
        return (
          <div key={i} className="swimRow"><span className={lane0Class} >{lane0}</span><span className={lane1Class} >{lane1}</span></div>
        )
      })}
      </div>
    )
  }
}


export default SwimLane;
