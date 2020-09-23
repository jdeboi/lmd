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
import Critique from './Critique';
import Watching from './Watching';
import Help from './Help';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`scrollable-prevent-tabpanel-${index}`}
    aria-labelledby={`scrollable-prevent-tab-${index}`}
    {...other}
    >
    {value === index && (
      <div>{children}</div>
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
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

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
    <AppBar position="static">
    <Tabs
    value={value}
    onChange={handleChange}
    variant="scrollable"
    scrollButtons="off"
    aria-label="scrollable prevent tabs example"
    >
    <AntTab icon={<SmsOutlinedIcon />} aria-label="chat" {...a11yProps(0)} />
    <AntTab icon={<EditOutlinedIcon />} aria-label="leave critique" {...a11yProps(1)} />
    <AntTab icon={<VisibilityOutlinedIcon />} aria-label="who is watching" {...a11yProps(2)} />
    <AntTab icon={<HelpOutlineOutlinedIcon />} aria-label="help" {...a11yProps(3)} />

    </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
    <Chat {...props} />
    </TabPanel>
    <TabPanel value={value} index={1}>
    <Critique />
    </TabPanel>
    <TabPanel value={value} index={2}>
    <Watching />
    </TabPanel>
    <TabPanel value={value} index={3}>
    <Help />
    </TabPanel>
    </div>
  );
}
