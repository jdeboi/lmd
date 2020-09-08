import React from 'react';
import './DesktopIcon.css';

import Frame from '../Frame/Frame';
import Draggable from 'react-draggable';

class DesktopIcon extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);


    this.state = {
      isHidden: true
    }

    this.wrapper = React.createRef();
    this.doubleClicked = this.doubleClicked.bind(this);
  }

  doubleClicked() {
    // let {isHidden} = this.state;
    // isHidden = !isHidden;
    this.setState({isHidden: false});
    this.props.ondblclick(this.props.id);
  }

  onHide() {
    this.setState({isHidden: true});
  }


  render() {
    const parser = new DOMParser();
    var title = this.props.title;

    var classn = "DesktopIcon";
    if (this.props.className) classn += " " + this.props.className;

    const {isHidden} = this.state;
    //https://github.com/STRML/react-draggable

    // position = {...} makes it have a specific location. when you want direct control.
    let pos = this.state.controlledPosition;
    let off = this.props.dx ? {x: this.props.dx, y: this.props.dy}: null;
    let frameH = this.toolBarH + (this.state.isMinimized?0:this.props.height);
    // so if we make pos null, it stays where it is dragged to
    // however, it doesn't update when the page width / height changes
    // if we let pos be equal to props.px/ props.py, it changes location

    return (
      <div className="DesktopDiv" >
        <Draggable
          axis="both"
          handle={".DesktopIcon"}
          defaultPosition={{x: this.props.x, y: this.props.y}}
          position={pos}
          positionOffset={off}
          grid={[1, 1]}
          scale={1}
          bounds=".App-Content"
          cancel=".close, .minimize, .zoom"
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
          nodeRef={this.wrapper}
          >
          <div ref={this.wrapper} onDoubleClick={this.doubleClicked} className={classn} style={{width: this.props.width + "px",height: this.props.height + "px"}} >
            <div className="content">
              {this.props.content}
            </div>
            <div className="desktop-text">{this.props.title}</div>
          </div>
        </Draggable>
        <Frame title="test" isHidden={isHidden} onHide={this.onHide.bind(this)} x={this.props.box.x} y={this.props.box.y} width={this.props.box.w} height={this.props.box.h} content={this.props.frameContent}
          />
      </div>
    );
  }
}

export default DesktopIcon
