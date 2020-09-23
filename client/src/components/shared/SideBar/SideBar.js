

import React from 'react';
import './SideBar.css';

import Frame from '../Frame/Frame';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import TabPanel from './Tabs/TabPanel';

class SideBar extends React.PureComponent {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.state = {
    }

  }

  componentDidUpdate(prevProps) {

  }

  render() {
    const amt = this.props.showSideBar?"400px":"0px";
    const disp = this.props.showSideBar?"block":"none";
    const sty={width: amt, display: disp};

    return (
      <div className="SideBar" style={sty}>
      <div className="SideBar-Content">
      <TabPanel {...this.props} />
      </div>
      </div>
    );


  }
}

export default SideBar
