import React from 'react';
import './Frame.css';
import Draggable from 'react-draggable';
import Toolbar from './Toolbar';

class Frame extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.toolBarH = 26;

    // this.dim = {
    //   frameWidth : this.props.width+2,
    //   frameHeight : this.props.height + this.toolBarH
    // };
    this.start = this.props.x;
    this.state = {
      isVisible : true,
      isMinimized: false,
      frameWidth : this.props.width + 2,
      frameHeight : this.props.height + this.toolBarH,
      currentFrameHeight: this.props.height + this.toolBarH,

      controlledPosition: this.props.isControlled?{x: this.props.px, y:this.props.py}:null
    }

    const {x, y} = this.props;
    this.origCoords = {
      x: x,
      y: y
    };


    this.toggleMaximized = this.toggleMaximized.bind(this);
    this.toggleMinimzed = this.toggleMinimzed.bind(this);
    this.toggleClosed = this.toggleClosed.bind(this);
    this.customDrag = this.customDrag.bind(this);

    this.wrapper = React.createRef();
  }

  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  toggleClosed() {
    console.log("CLOSE")
    this.setState({
      isVisible: false
    })

    if (this.props.onHide) this.props.onHide();
  }

  toggleMinimzed() {

    let mini = !this.state.isMinimized;
    // let fh = this.toolBarH;
    // console.log("MINI")
    // if (mini) fh = "22";
    this.setState({
      isMinimized: mini
    })
  }

  toggleMaximized() {
    // this.setState({
    //   isMaximized: !this.state.isMaximized
    // })
    //
    // if (this.state.isMaximized) {
    //   this.setState({
    //     width: window.innerWidth + "px",
    //     height: window.innerHeight + "px",
    //   })
    // }
    // else {
    //   this.setState({
    //     width: this.dim.frameWidth + "px",
    //     height:this.dim.frameHeight + "px",
    //   })
    // }
    if (this.state.controlledPosition) this.returnOriginalCoords();
  }

  customDrag(e, ui) {
    if(this.props.onDrag) {

      // let x = ui.x;
      // let y = ui.y;

      this.props.onDrag(this.props.id, ui);

    }
  }
  // For controlled component
  adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {x, y} = this.state.controlledPosition;
    this.setState({controlledPosition: {x: x - 10, y}});
  };

  adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = controlledPosition;
    this.setState({controlledPosition: {x, y: y - 10}});
  };

  returnOriginalCoords() {
    // e.preventDefault();
    // e.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = controlledPosition;
    console.log(controlledPosition);
    this.setState({controlledPosition: {x: this.origCoords.x, y: this.origCoords.y}});
  }

  render() {
    const parser = new DOMParser();
    var title = this.props.title;
    if (title === "") {
      const parsedString = parser.parseFromString(this.props.icon, 'text/html');
      title = parsedString.body.innerHTML;
    }

    var classn = "Frame";
    if (this.props.isHidden == null && !this.state.isVisible) {
      classn += " hidden";
    }
    else if (this.props.isHidden ) {
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
      height: this.props.height+ "px",
      width: this.props.width + "px"
    }

    //https://github.com/STRML/react-draggable

    // position = {...} makes it have a specific location. when you want direct control.
    let pos = this.state.controlledPosition;
    let off = this.props.dx ? {x: this.props.dx, y: this.props.dy}: null;
    let frameH = this.toolBarH + (this.state.isMinimized?0:this.props.height);
    // so if we make pos null, it stays where it is dragged to
    // however, it doesn't update when the page width / height changes
    // if we let pos be equal to props.px/ props.py, it changes location

    let onDrag = this.props.onDrag?this.customDrag:this.handleDrag;

    return (

      <Draggable
        axis="both"
        handle={this.props.handle?".handle, " + this.props.handle: ".handle"}
        defaultPosition={{x: this.props.x, y: this.props.y}}
        position={pos}
        positionOffset={off}
        grid={[1, 1]}
        scale={1}
        bounds=".App-Content"
        cancel=".close, .minimize, .zoom"
        onStart={this.handleStart}
        onDrag={onDrag}
        onStop={this.handleStop}
        nodeRef={this.wrapper}
        >
        <div ref={this.wrapper} className={classn} style={{width: this.props.width + 2 + "px",height: frameH + "px"}} >
          <div className={this.props.window?"window " + this.props.window:"window"} style={this.props.windowStyle}>
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

//<span className="circleTxt"><strong>x</strong></span>
//<span className="circleTxt"><strong>&ndash;</strong></span>
//<span className="circleTxt"><strong>+</strong></span>


export default Frame
