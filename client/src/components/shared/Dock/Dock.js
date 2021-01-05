import React from 'react';
import './Dock.css';

class Dock extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        showDock : true
      }

  }

  componentDidMount() {
    setTimeout(this.hideDock, 4000);
  }

  hideDock = () => {
    this.setState({showDock: false});
  }

  goHome = () => {
    alert("already home");
  }

  openChat = () => {
    
  }

  render() {

    let classn = this.state.showDock||this.props.showDock?"showDock":"hideDock";
    return (
      <div className="Dock">
        <div className={"dock " + classn}>
          <ul>
            <li id="home">
              <div onClick={this.goHome}>
                <em>
                  <span>Home Page</span>
                </em>
                <img src="/assets/s3-bucket/gallery/home.png" />
              </div>
            </li>
            <li id="chat">
              <div onClick={this.openChat}>
                <em>
                  <span>Chat</span>
                </em>
                <img src="/assets/s3-bucket/gallery/messages-icon.png" />
              </div>
            </li>
            <li id="codepen">
              <a href="#codepen">
                <em>
                  <span>Mini Map</span>
                </em>
                <img src="/assets/s3-bucket/gallery/maps-icon.png" />
              </a>
            </li>
            <li id="reason">
              <a href="#reason">
                <em>
                  <span>Info</span>
                </em>
                <img src="/assets/s3-bucket/gallery/info2.png" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Dock;
