import React from 'react';
import "./Mars.css";
import MarsDesktop from './components/MarsDesktop';
import MarsMobile from './components/MarsMobile';

// store
import { connect } from 'react-redux';
import { setSketchMusic } from '../../../store/actions/music';

class Mars extends React.Component {

  constructor(props) {
    super(props);


  }


  componentDidMount() {

    this.props.setSketchMusic("mars", 0, .1);
  }

  componentWillUnmount() {
  }


  justPool = () => {
    const { ui } = this.props;
    if (ui.orientation === "portrait" && ui.contentW < 750)
      return true;
    else if (ui.orientation === "landscape" && ui.contentH < 500)
      return true;
    return false;
  }

  render() {

    return (
      <div className="Mars Sketch">
        {this.justPool() ? <MarsMobile /> : <MarsDesktop addClass={this.props.addClass} removeClass={this.props.removeClass} />}
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
    setSketchMusic
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Mars);

