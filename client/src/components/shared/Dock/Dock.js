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
                <img src={window.AWS + "/clickMe/eraser.png"} />
              </div>
            </li>
            
          </ul>
        </div>
      </div>
    )
  }
}

export default Dock;
