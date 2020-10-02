import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Chat from './Chat/Chat';
import Critique from './Critique/Critique';
import Help from './Help';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className={value !== index?"inactive-tabs-panel":"active-tabs-panel"}
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
      >
      {value === index && (
        <div className="tabs">{children}</div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {

    // height: "100%",
    width: '100%',
    display: "flex",

    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000000dd" //theme.palette.background.paper,
  },
}));

const appBlue = "#335ef6";
const appPink = "#fc03ad";
const appLightBlue = "#03cefc";
const AppBarMe = withStyles((theme) => ({
  root: {
    flex: "0 0 auto",
    height: "50px",
    background: `linear-gradient(${appBlue}, #1000ff);`,
    zIndex: 0,
    fontFamily: [
      'Arial',
      'sans-serif'
    ].join(','),
    '&:hover': {
    },
    '&$selected': {
      borderColor: "green"
    },
    '&:focus': {
    },
  }
}))((props) => <AppBar {...props} />);


const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: 'white',
      opacity: 1,
    },
    '&$selected': {
      color: 'white',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: 'white',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);


export default function ScrollableTabsButtonPrevent(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBarMe position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
          indicatorColor="primary"
          textColor="primary"
          centered
          >
          <AntTab icon={<SmsOutlinedIcon fontSize="large" />} aria-label="chat" {...a11yProps(0)} />
          <AntTab icon={<EditOutlinedIcon fontSize="large" />} aria-label="leave critique" {...a11yProps(1)} />
          <AntTab icon={<HelpOutlineOutlinedIcon fontSize="large" />} aria-label="help" {...a11yProps(2)} />

        </Tabs>
      </AppBarMe>
      <TabPanel value={value} index={0}>
        <Chat {...props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Critique user={props.user} room={props.room} />
      </TabPanel>
      <TabPanel value={value} index={2}>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Help />
      </TabPanel>
    </div>
  );
}
