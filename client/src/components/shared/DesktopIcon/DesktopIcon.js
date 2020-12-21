import React from 'react';
import './DesktopIcon.css';

import { connect } from 'react-redux';
import Frame from '../Frame/Frame';
import Draggable from 'react-draggable';


class DesktopIcon extends React.Component {
  //https://github.com/STRML/react-draggable
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);


    this.state = {
      isHidden: true,
      controlledPosition: { x: props.x, y: props.y }
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
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };

  onDblClick = () => {
    // let {isHidden} = this.state;
    // isHidden = !isHidden;
    this.setState({ isHidden: false });
    this.props.onDblClick(this.props.id);
  }

  onClick = () => {
    if (this.props.newIconToTop) this.props.newIconToTop();
  }

  onHide = () => {
    this.setState({ isHidden: true });
  }



  render() {

    const { ui } = this.props;
    if (ui.isMobile)
      return this.getMobileDesktop();
    return this.getDesktopDesktop();

  }

  getDesktopDesktop = () => {
    const { controlledPosition, isHidden } = this.state;
    const parser = new DOMParser();
    var title = this.props.title;

    var classn = "DesktopIcon";
    if (this.props.className) classn += " " + this.props.className;



    // position = {...} makes it have a specific location. when you want direct control.
    // let pos = this.state.controlledPosition;
    let frameH = this.toolBarH + (this.state.isMinimized ? 0 : this.props.height);
    // so if we make pos null, it stays where it is dragged to
    // however, it doesn't update when the page width / height changes
    // if we let pos be equal to props.px/ props.py, it changes location
    const bounded = this.props.bounded ? ".App-Content" : null;
    return (
      <div className="DesktopDiv" >
        <Draggable
          axis="both"
          handle={".DesktopIcon"}
          defaultPosition={{ x: this.props.x, y: this.props.y }}
          position={controlledPosition}
          grid={[1, 1]}
          scale={1}
          bounds={bounded}
          cancel=".close, .minimize, .zoom"
          onStart={this.handleStart}
          onDrag={this.onControlledDrag}
          onStop={this.handleStop}
          nodeRef={this.wrapper}
        >
          <div ref={this.wrapper} onDoubleClick={this.onDblClick} onClick={this.onClick} className={classn} style={{ width: this.props.width + "px", height: this.props.height + "px", zIndex: this.props.zIcon ? this.props.zIcon : 0 }} >
            <div className="content">
              {this.props.content}
            </div>
            <div className="desktop-text">{this.props.title}</div>
          </div>
        </Draggable>
        {this.props.disableWindow ? null : this.getFrame()}
      </div>
    );
  }

  getMobileDesktop = () => {

    const parser = new DOMParser();
    var title = this.props.title;

    var classn = "DesktopIcon DesktopIconMobile";
    if (this.props.className) classn += " " + this.props.className;

    return (
      <div className="DesktopDivMobile"
        onClick={this.onDblClick}
        style={{
          top: this.props.y,
          left: this.props.x,
          width: this.props.width,
          height: this.props.height,
          zIndex: this.props.zIcon ? this.props.zIcon : 0
        }} >
        <div className="content">
          {this.props.content}
        </div>
        <div className="desktop-text">{this.props.title}</div>
      </div>
    );

  }

  getFrame() {
    const { isHidden } = this.state;

    return (
      <Frame className="FolderOpenFrame" title={this.props.title} isHidden={isHidden} onHide={this.onHide.bind(this)} x={this.props.box.x} y={this.props.box.y} z={this.props.zFrame ? this.props.zFrame : 0} width={this.props.box.w} height={this.props.box.h} content={this.props.frameContent} newFrameToTop={this.props.newFrameToTop} />

    )
  }

}




const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  }
}

const mapDispatchToProps = () => {
  return {
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(DesktopIcon);

