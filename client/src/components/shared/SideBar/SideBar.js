

import React from 'react';
import './SideBar.css';

import Frame from '../Frame/Frame';
import TabPanel from './Tabs/TabPanel';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles,   ThemeProvider,  createMuiTheme, } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
    type: 'dark'
  },
  typography: {
    fontFamily: 'dogica, Arial',
    fontSize: 10,
  },
  overrides: {
  
  }
});

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
        <ThemeProvider theme={theme}>
          <div className="SideBar-Flex">
            <div className="SideBar-Space"></div>
            <div className="SideBar-Content">
              <TabPanel {...this.props} />
            </div>
          </div>
        </ThemeProvider>
      </div>
    );


  }
}

export default SideBar
