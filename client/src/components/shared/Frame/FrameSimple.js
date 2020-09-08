import React from 'react';
import './Frame.css';
import Toolbar from './Toolbar';
// import Draggable from 'react-draggable';

class FrameSimple extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isMinimized: false,
  //     isClosed: false
  //   }
  //
  //   this.toggleClosed = this.toggleClosed.bind(this);
  //
  // }

  render() {
    let toolBarH = 30;

    // var title = this.props.title;

    let x = Math.floor(this.props.px);
    let y = Math.floor(this.props.py);
    var sty = {
      width: this.props.width,
      height: this.props.height + toolBarH,
      left: x,
      top: y,
      // display: this.state.isClosed?"none":"block"
    }

    let classN = "Frame FrameSimple";
    if (this.props.notAbsolute) classN += " static"

    // so i guess x/y in <FrameSimple x={..} ...} doesn't do anything?
    // but px={} py={} does?
    // how does this differ from <Frame ..> ?
    // oh frame simple isn't draggable.. doi

     return (
      <div className={classN} style={sty}>
        <div className="window" style={this.props.windowStyle}>
          <Toolbar title={this.props.title} toggleClosed={this.toggleClosed} toggleMinimzed={this.toggleMinimzed} toggleMaximized={this.toggleMaximized} />

          <div className="content">
            {this.props.content}
          </div>

        </div>
      </div>

    );
  }

  toggleMinimzed() {
    //ok...
  }

  toggleClosed() {
    // this.setState({isClosed: true});
  }
}



export default FrameSimple
