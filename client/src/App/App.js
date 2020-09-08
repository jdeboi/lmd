import React from 'react';
import { Route, Switch } from "react-router-dom";

import './App.css';
import Header from '../components/shared/Header/Header';

// cookies
import Cookies from 'js-cookie';

// sketches
import HomePage from '../components/sketches/HomePage/HomePage';
import Dimension from '../components/sketches/Dimension/Dimension';
import MacbookAir from '../components/sketches/MacbookAir/MacbookAir';
import ClickMe from '../components/sketches/ClickMe/ClickMe';
import JungleGyms from '../components/sketches/JungleGyms/JungleGyms';
import HardDrives from '../components/sketches/HardDrives/HardDrives';
import Spacetimes from '../components/sketches/Spacetimes/Spacetimes';
import Mars from '../components/sketches/Mars/Mars';
import WetStreams from '../components/sketches/WetStreams/WetStreams';
import WaveForms from '../components/sketches/WaveForms/WaveForms';

// under construction
import Altar from '../components/sketches/Altar/Altar';
import MoonLight from '../components/sketches/MoonLight/MoonLight';
import Loop from '../components/sketches/Loop/Loop';
import Three from '../components/sketches/Three/Three';
import Dinner from '../components/sketches/Dinner/Dinner';

// pages
import About from '../components/pages/About';
import Credits from '../components/pages/Credits';
import NotFound from '../components/pages/NotFound';

import Frame from '../components/shared/Frame/Frame';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';



// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    primary: { main: indigo[300] },
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cursor: 0,
      cursorID: 0,
      windowWidth: 0,
      windowHeight: 0,
      wOG: 0,
      hOG: 0,
      flipped: false
    };

    this.setHands = this.setHands.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.getDeviceDimensions = this.getDeviceDimensions.bind(this);
  }


  componentDidMount() {
    const id = Cookies.get('hand');
    this.setState({cursor: `cursor-${id}`});
    this.setState({cursorID: id});

    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    this.setState({ windowWidth, windowHeight, wOG:windowWidth, hOG:windowHeight });

    window.addEventListener("resize", this.updateDimensions);
    /*
    a, a:link, a:visited, a:focus, a:hover, a:active, .MuiSlider-root, .MuiButtonBase-root {
    cursor: url("./assets/pointer.png"), auto;
    }
    */
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    let flipped = false;
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    let ratio = this.state.wOG/this.state.hOG;
    if (windowWidth/windowHeight !== ratio) flipped = true;
    // console.log("ratio",windowWidth/windowHeight, ratio,flipped );
    this.setState({ windowWidth, windowHeight, flipped });
  }

  setHands(val) {
    this.setState({cursor: `cursor-${val}`});
    this.setState({cursorID: val});
  }

  getDeviceDimensions() {
    const {windowWidth, windowHeight, flipped} = this.state;
    const orientation = windowWidth/windowHeight > 1 ? "landscape":"portrait";

    let minD = Math.min(windowWidth, windowHeight);
    console.log("minD", minD,window.innerWidth, window.innerHeight);
    let deviceType = "";
    if (minD < 450) deviceType="mobile";
    else if (minD <  700) deviceType="tablet";
    else deviceType="desktop";

    let dimensions = {windowWidth: windowWidth, windowHeight:windowHeight, device:deviceType, orientation: orientation, flipped: flipped };
    // console.log("info", dimensions)
    return dimensions;
  }

  render() {
    let dimensions = this.getDeviceDimensions();
    return (
      <div className={"App" + " " + this.state.cursor}>
        <MuiThemeProvider theme={theme}>
          <div className="App-Header">
            <div className="BackHeader"></div>
            <Header callback={this.setHands} dimensions={dimensions} />
          </div>
          <div className="App-Content inner-outline">
            <Switch>
              <Route exact path="/" render={() => (<MacbookAir dimensions={dimensions} />)} />
              <Route  path="/losing-my-dimension" component={Dimension} />
              <Route  path="/macbook-air" render={() => (<MacbookAir dimensions={dimensions} />)} />
              <Route  path="/i-got-the-feels" component={ClickMe} />
              <Route  path="/jungle-gyms" component={JungleGyms} />
              <Route  path="/hard-drives-on-seashores" component={HardDrives} />
              <Route  path="/wasted-days-are-days-wasted" render={() => (<Spacetimes dimensions={dimensions} />)} />
              <Route  path="/pothole-city-esc" render={() => (<Mars dimensions={dimensions} />)}/>
              <Route  path="/wet-streams" component={WetStreams} />

              <Route  path="/dinner" component={Dinner} />
              <Route  path="/altars" component={Altar} />
              <Route  path="/xfinity-depths" render={() => (<Loop dimensions={dimensions} />)}/>
              <Route  path="/glory-in-the-cloud" render={() => (<WaveForms cursor={this.state.cursorID} />)} />
              <Route  path="/moon-light" component={MoonLight} />
              <Route  path="/three" component={Three} />

              <Route  path="/credits" component={Credits} />
              <Route  path="/words" component={About} />
              <Route  component={NotFound} />
            </Switch>
            {/* <div id="fps">0</div> */}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

}



export default App;
