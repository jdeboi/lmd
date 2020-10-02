import React from 'react';
import FrameSimple from '../../shared/Frame/FrameSimple';

class Birds extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      birdInitialsX: [],
      birdInitialsY: [],
      numVisibleBirds : 4,
      flyIndex: 0,
      flyDirection: true
    }
  }

  componentDidMount() {
    this.initBirds();
    this.interval = setInterval(this.updateBirds, 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="birds">
        {this.state.birdInitialsX.map((pos, index) => {
          return (this.getBird(index))
        })}
      </div>
    )
  }

  initBirds = () => {
    let birds = [];
    let xSpace = 100;
    let ySpace = 80;
    // let num = Math.floor(4*Math.random()+2);
    // let d =  Math.random();
    const dir = true;
    const birdInitialsX = [];
    const birdInitialsY = [];
    const num = 5;
    for (var i = 0; i < num; i++) {
      let mid = num/2;

      let dx = i * xSpace + Math.random()*30;
      if (i >= mid) dx = (num - i) * xSpace + Math.random()*30;
      if (num%2 == 0 && i>= mid) dx += xSpace/2;

      let dy = i * ySpace + Math.random()*10;

      let x0 = dx-300;
      let y0 = dy;
      birdInitialsX[i] = x0;
      birdInitialsY[i] = y0;
    }
    this.setState({birdInitialsX, birdInitialsY, flyDirection: dir});
  }

  updateBirds = () => {
    const maxW = this.state.windowWidth+600;
    const {flyIndex, flyDirection} = this.state;
    if (flyIndex > maxW) {
      this.setState(prevState => ({
        flyDirection: Math.random()>.5?true:false,
        flyIndex: 0,
        numVisibleBirds: Math.floor(4*Math.random()+2)
      }));
    }
    else {
      const inc = 5;
      this.setState({flyIndex: this.state.flyIndex+inc});
    }
  }

  getBird = (index) => {
    const bird = this.getBirdLocation(index);
    return (
      <FrameSimple title="" content={
          <div className={"bird " + (this.state.flyDirection?"flippedX":"")}></div>
        }
        width={78+2} key={index} windowStyle={{background: "transparent"}} height={60} px={bird.x} py={bird.y}
        />
    )
  }

  getBirdLocation = (index) => {
    const {numVisibleBirds, flyIndex, flyDirection, birdInitialsX, birdInitialsY, windowWidth} = this.state;
    const bird = {};
    if (index < numVisibleBirds) {
      if (flyDirection) {
        bird.x = flyIndex + birdInitialsX[index];
        bird.y = birdInitialsY[index]+50*Math.sin(bird.x/100);
        bird.y = Math.floor(bird.y);
      } else {
        bird.x = (windowWidth+100) - (flyIndex + birdInitialsX[index]);
        bird.y = birdInitialsY[index]+50*Math.sin(bird.x/100);
        bird.y = Math.floor(bird.y);
      }
    }
    else {
      bird.x = -1000;
      bird.y = -1000;
    }
    return bird;
  }


}

export default Birds;
