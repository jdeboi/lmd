import React from 'react';
import './Header.css';
import FinderSubmenu from './FinderSubmenu';
import Cookies from 'js-cookie';


class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTimeString: 0,
      hand: 0
    }

    this.updateClock = this.updateClock.bind(this);
    this.getRightMenus = this.getRightMenus.bind(this);
    // this.setHands = this.setHands.bind(this);
  }

  componentDidMount() {
    this.updateClock();
    this.interval = setInterval(this.updateClock, 1000);
    let id = Cookies.get("hand");
    if (id) {
      this.setState({"hand": id});
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setHands(val) {
    Cookies.set('hand', val);
    this.setState({hand: val});
    this.props.callback(val);
  }

  render() {
    //"sad fountains"
    const finderMenuItems = [

      {title: "macbook air", link:"/macbook-air", shortcut: "&#x2318;1"},
      {title: "wet streams", link:"/wet-streams", shortcut: "&#x2318;2"},
      {title: "hard drives on seashores", link:"/hard-drives-on-seashores", shortcut: "&#x2318;3"},
      {title: "jungle gyms", link:"/jungle-gyms", shortcut: "&#x2318;4"},
      {title: "wasted days are days wasted", link:"/wasted-days-are-days-wasted", shortcut: "&#x2318;5"},
      {title: "mars esc", link:"/mars-esc", shortcut: "&#x2318;6"},
      {title: "xfinity depths", link:"/xfinity-depths", shortcut: "&#x2318;7"},
      {title: "cloud confessional", link:"/cloud-confessional", shortcut: "&#x2318;8"},
      // {title: "i got the feels", link:"/i-got-the-feels", shortcut: "&#x2318;8"},
      // {title: "losing my dimension", link:"/losing-my-dimension", shortcut: "&#x2318;9"},
    ];

    const inProgressMenu = [
      // {title: "chrome altars", link:"/altars", shortcut: "&#x2318;7"},


      {title: "confessions", link:"/confessions", shortcut: "&#x2318;7"},
      {title: "moon light", link:"/moon-light", shortcut: "&#x2318;7"},
      {title: "three", link:"/three", shortcut: "&#x2318;7"},
      {title: "table for 2", link:"/dinner", shortcut: "&#x2318;7"},
    ];

    const hamburgerMenuItems = [
      {title: "statement", link:"/words", shortcut: "&#128222"},
      // {title: "cookies", link:"/words", shortcut: "🍪"},
      {title: "credits", link:"/credits", shortcut: ""},
    ];


    return (

      <header className="Header menuTheme">
        <ul className="left">
          <FinderSubmenu cursor={`cursor-${this.state.hand}`} dimensions={this.props.dimensions} title="" icon="fa fa-cube" specialClass="apple" listItems={hamburgerMenuItems} />
          <FinderSubmenu cursor={`cursor-${this.state.hand}`} dimensions={this.props.dimensions} title="losing my dimension" specialClass="bold" listItems={finderMenuItems} />
          <FinderSubmenu cursor={`cursor-${this.state.hand}`} dimensions={this.props.dimensions} title="(in progress)" specialClass="bold" listItems={inProgressMenu} />

        </ul>
        {this.props.dimensions.device==="desktop"?this.getRightMenus():<div></div>}
      </header>
    );
  }

  getRightMenus() {
    const hands = [
      {title: "✊🏿", callback: () => {this.setHands(5)}, shortcut: ""},
      {title: "👆🏿", callback: () => {this.setHands(0)}, shortcut: ""},
      {title: "👆🏾", callback: () => {this.setHands(1)}, shortcut: ""},
      {title: "👆🏽", callback: () => {this.setHands(2)}, shortcut: ""},
      {title: "👆🏼", callback: () => {this.setHands(3)}, shortcut: ""},
      {title: "👆🏻", callback: () => {this.setHands(4)}, shortcut: ""},
    ];

    return(
      <ul className="right">
        <FinderSubmenu cursor={`cursor-${this.state.hand}`} dimensions={this.props.dimensions} title="" icon="fa fa-hand-o-up" listItems={hands} />
        <li className="clickable"><a className={`cursor-${this.state.hand}`} href="https://www.instagram.com/jdeboi" target='_blank' rel="noopener noreferrer"><i className="fa fa-instagram"></i></a></li>
        <li id="volume-icon-li" className="expandable"><i className="fa fa-volume-off" id="volume-icon"></i>
        <div className="submenu">
          <ul className="volume">
            <li className="volume">
              <div>
                <input type="range" min="0" max="100" defaultValue="0" id="volume" />
              </div>
            </li>
          </ul>
        </div>
      </li>
      <li><span id="clock">{this.state.currentTimeString}</span></li>
      {/* <li><a href="https://jdeboi.com/" target='_blank'>jdeboi</a></li>*/}
    </ul>
  );
}

updateClock() {
  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;

  // var currentSeconds = currentTime.getSeconds();
  // currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

  var timeOfDay = (currentHours < 12) ? "AM" : "PM";
  currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
  currentHours = (currentHours === 0) ? 12 : currentHours;

  var shortDays = [
    'Sun', //Sunday starts at 0
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];
  var x = currentTime.getDay(); //This returns a number, starting with 0 for Sunday
  var day = (shortDays[x]);

  var currentTimeString = day + " " + currentHours + ":" + currentMinutes + " " + timeOfDay;

  this.setState({currentTimeString: currentTimeString});
}

}

export default Header
