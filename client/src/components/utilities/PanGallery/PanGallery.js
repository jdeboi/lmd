import React from 'react';
import "../../sketches/Gallery/Gallery.css";

import Sketch from '../Projection/PanSketch';
// import { wineLocation, djLocation } from '../../sketches/Gallery/constants';
// import LoadingPage from '../../shared/LoadingPage/LoadingPage';


// store
import { connect } from 'react-redux';
import { doneLoadingApp } from '../../../store/actions';

class PanGallery extends React.Component {

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  loadingDone = () => {
    this.props.doneLoadingApp();
  }

  render() {
    const { users, roomCount, ui } = this.props;

    return (
      <div className="Gallery Sketch" >
        <div id="p5_loading" className="loadingclass" style={{display:"none"}}></div>
        <Sketch
          className="p5sketch"
          users={users}
          roomCount={roomCount}
          isClosed={false}
          loadingDone={this.loadingDone}
          isMobile={ui.isMobile}
        />
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    // user: state.user,
    // music: state.music,
    // outside: state.outside,
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    // moveUser,
    // toggleOutside,
    doneLoadingApp,
    // setUserActiveChat,
    // setOneMenu,
    // showChat
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(PanGallery);
