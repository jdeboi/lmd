import React from 'react';
import './Frame.css';
import Draggable from 'react-draggable';
import Toolbar from './Toolbar';

import PropTypes from 'prop-types';


class Frame extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.toolBarH = 26;


    const { x, y } = this.props;
    this.origCoords = {
      x: x,
      y: y
    };

    // this.start = this.props.x;
    this.state = {
      isVisible: true,
      isMinimized: false,
      deltaPosition: {
        x: 0, y: 0
      },
      controlledPosition: {
        x: x, y: y
      }
    }

    this.wrapper = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.x !== prevProps.x || this.props.y !== prevProps.y) {
      const dx = this.props.x - prevProps.x;
      const dy = this.props.y - prevProps.y;
      const controlledPosition = { ...this.state.controlledPosition }
      this.setState({ controlledPosition: { x: controlledPosition.x + dx, y: controlledPosition.y + dy } });
    }
  }

  onControlledDrag = (e, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
    if (this.props.onDrag) this.props.onDrag(position);

  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };

  toggleClosed = (e) => {
    // console.log("CLOSE")
    this.setState({
      isVisible: false
    })

    if (this.props.onHide) this.props.onHide();
    e.stopPropagation();
  }

  toggleMinimzed = (e) => {
    this.setState(prevState => ({
      isMinimized: !prevState.isMinimized
    }), () => {
      if (this.props.onMinimized) this.props.onMinimized();
    });

    e.stopPropagation();
  }

  toggleMaximized = (e) => {
    const controlledPosition = { ...this.state.controlledPosition };
    controlledPosition.x = this.origCoords.x;
    controlledPosition.y = this.origCoords.y;
    console.log(this.origCoords);
    this.setState({ controlledPosition }, () => {
      if (this.props.onMaximized) this.props.onMaximized();
    });
    e.stopPropagation()
  }



  onStart = () => {
    this.setState({ activeDrags: this.state.activeDrags + 1 });
    if (this.props.onStart) this.props.onStart();
  };

  onStop = () => {
    this.setState({ activeDrags: this.state.activeDrags - 1 });
    if (this.props.onStop) this.props.onStop();
  };

  handleStart = () => {
    if (this.props.newFrameToTop) this.props.newFrameToTop();
  }

  handleClick = (e) => {
    if (this.props.newFrameToTop) this.props.newFrameToTop();
    e.stopPropagation();
  }


  // returnOriginalCoords() {
  //   // e.preventDefault();
  //   // e.stopPropagation();
  //   const {controlledPosition} = this.state;
  //   const {x, y} = controlledPosition;
  //   console.log(controlledPosition);
  //   this.setState({controlledPosition: {x: this.origCoords.x, y: this.origCoords.y}});
  // }

  render() {
    const parser = new DOMParser();
    var title = this.props.title;
    // const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const { controlledPosition } = this.state;
    // const cP = {x: controlledPosition.x, y: controlledPosition.y};
    // cP.x += (this.props.x - this.origCoords.x);
    // cP.y += (this.props.y - this.origCoords.y);

    if (title === "") {
      const parsedString = parser.parseFromString(this.props.icon, 'text/html');
      title = parsedString.body.innerHTML;
    }

    var classn = "Frame";
    if (this.props.isHidden == null && !this.state.isVisible) {
      classn += " hidden";
    }
    else if (this.props.isHidden) {
      classn += " hidden";
    }
    else if (this.props.isMinimized | this.state.isMinimized) {
      classn += " minimized";
    }

    if (this.state.isMaximized) {
      classn += " maximized";
    }

    if (this.props.className) classn += " " + this.props.className;


    var contentVisibility = {
      display: this.state.isMinimized ? "none" : "block",
      height: this.props.height,
      width: this.props.width
    }

    //https://github.com/STRML/react-draggable

    // position = {...} makes it have a specific location. when you want direct control.
    // let pos = this.state.controlledPosition;
    // let off = this.props.dx ? {x: this.props.dx, y: this.props.dy}: null;
    let frameH = this.toolBarH + (this.state.isMinimized ? 0 : this.props.height);
    // so if we make pos null, it stays where it is dragged to
    // however, it doesn't update when the page width / height changes
    // if we let pos be equal to props.px/ props.py, it changes location

    const bounds = this.props.bounded ? ".App-Content" : null;
    const frameStyle = { width: Math.floor(this.props.width) + 2, zIndex: this.props.z ? this.props.z : 0 };
    if (frameH)
      frameStyle.height = Math.floor(frameH);
    return (

      <Draggable
        axis="both"
        handle={this.props.handle ? ".handle, " + this.props.handle : ".handle"}
        defaultPosition={{ x: this.props.x, y: this.props.y }}
        position={controlledPosition}
        positionOffset={null}
        grid={[1, 1]}
        scale={1}
        bounds={bounds}
        cancel=".close, .minimize, .zoom"
        onStart={this.handleStart}
        onDrag={this.onControlledDrag}
        onStop={this.handleStop}
        nodeRef={this.wrapper}
      >
        <div ref={this.wrapper} onClick={this.handleClick} className={classn} style={frameStyle} >
          <div className={this.props.window ? "window " + this.props.window : "window"} style={this.props.windowStyle}>
            <Toolbar title={this.props.title} toggleClosed={this.toggleClosed} toggleMinimzed={this.toggleMinimzed} toggleMaximized={this.toggleMaximized} />
            <div className="content" style={contentVisibility}>
              {this.props.content}
            </div>
          </div>
        </div>
      </Draggable>

    );
  }

  closeFrame() {

  }
}

Frame.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  handle: PropTypes.string,
  window: PropTypes.string,
  bounded: PropTypes.bool,

  windowStyle: PropTypes.object,

  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  z: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number.isRequired,
  content: PropTypes.node.isRequired,


  isHidden: PropTypes.bool,
  isMinimized: PropTypes.bool,

  onDrag: PropTypes.func,
  onHide: PropTypes.func,
  onMinimized: PropTypes.func,
  onMaximized: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  newFrameToTop: PropTypes.func,
};

export default Frame
