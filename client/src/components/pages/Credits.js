import React from 'react';
import './Pages.css';
import { connect } from 'react-redux';
import { setNoSketchMusic } from '../../store/actions/music';

// "Parasol Open Close" by Sungebob is licensed under Creative Commons Attribution. https://skfb.ly/6USQZ To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/. umbrella
class Credits extends React.Component {

  componentDidMount() {
    this.props.setNoSketchMusic();
  }

  render() {
    const { ui } = this.props;
    let classN = "Page " + ui.size;
    if (ui.hasFooter && ui.orientation === "landscape")
      classN += " landscape";
    
      return (
      <div className={classN}>
        <div className="Credits container">
          {/* <div className="container"> */}
          <h1>credits</h1>
          <p>I'd like to thank my thesis committee (Kevin Jones, Anne Nelson, and Sean Fader) and my awesome cohort for helping me pull off this body of work. Additionally, I used the following assets, which were provided through an open-source license providing that I credit the creator.</p>
          <h3>Assets:</h3>
          <ul>
            <li>thanks to Google for the <a href="https://poly.google.com/view/8Qwgncb6dJT">Umbrella Palm Tree</a>, licensed under CC BY 2.0</li>
            <li>thanks to bhgilad for the <a href="https://www.turbosquid.com/3d-models/80s-pool-chair-3d-model-1489585">pool chair</a></li>
            <li>thanks to Google for the <a href="https://poly.google.com/view/8Qwgncb6dJT">Umbrella Palm Tree</a>, licensed under CC BY 2.0</li>
            <li>thanks to Slanted Studios for the <a href="https://giphy.com/media/l3Uchq9s6Hx0aK8F2/giphy.gif">bird gif</a></li>
            <li>special thanks to <a href="https://github.com/1j01/pipes/blob/master/screensaver.js">Isaiah Odhner for the pipes code</a></li>
          </ul>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    // doneLoadingApp,
    setNoSketchMusic
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Credits);

