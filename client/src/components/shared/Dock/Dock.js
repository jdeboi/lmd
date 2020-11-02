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
                <img src="/assets/s3-bucket/homePage/home.png" />
              </div>
            </li>
            <li id="skype">
              <a href="#skype">
                <em>
                  <span>Chat</span>
                </em>
                <img src="/assets/s3-bucket/homePage/messages-icon.png" />
              </a>
            </li>
            <li id="codepen">
              <a href="#codepen">
                <em>
                  <span>Mini Map</span>
                </em>
                <img src="/assets/s3-bucket/homePage/maps-icon.png" />
              </a>
            </li>
            <li id="reason">
              <a href="#reason">
                <em>
                  <span>Info</span>
                </em>
                <img src="/assets/s3-bucket/homePage/info2.png" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Dock;
