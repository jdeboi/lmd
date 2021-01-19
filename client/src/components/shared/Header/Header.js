import React from 'react';
import './Header.css';
import FinderSubmenu from './components/FinderSubmenu';
import { withRouter, Link } from "react-router-dom";

// components
import Clock from './components/Clock';
// import Volume from '../Volume/VolumeMute';

// icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import NotifyIcon from '@material-ui/icons/Notifications'
import MapIcon from '@material-ui/icons/Room';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
// import Volume from '@material-ui/icons/VolumeMute';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';
import VolumeDown from '@material-ui/icons/VolumeDown';

// import UsersIcon from '@material-ui/icons/SupervisedUserCircle';

// store
import { connect } from 'react-redux';
import { toggleMap, toggleFaq, toggleChat, toggleUserIcons, toggleVolumeMenu } from '../../../store/actions/menuItems';
import { resetMessgeNotification } from '../../../store/actions/messages';
import { toggleVolume } from '../../../store/actions/music';


/*
React.PureComponent’s shouldComponentUpdate() only shallowly compares
the objects. If these contain complex data structures, it may produce
false-negatives for deeper differences. Only extend PureComponent when
you expect to have simple props and state, or use forceUpdate() when you
know deep data structures have changed. Or, consider
using immutable objects to facilitate fast comparisons of nested data.
https://reactjs.org/docs/react-api.html#reactpurecomponent
*/
class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTimeString: 0,
      showSideBar: true,
      volumeMuted: false
    }

  }

  // shouldComponentUpdate(nextProps) {
  //   const shouldRender = nextProps.dimensions.windowWidth !== this.props.dimensions.windowWidth
  //   || nextProps.dimensions.windowHeight !== this.props.dimensions.windowHeight
  //   || nextProps.dimensions.device !== this.props.dimensions.device
  //   || nextProps.user.avatar !== this.props.user.avatar;
  //   console.log(nextProps.dimensions.windowWidth, this.props.dimensions.windowWidth);
  //
  //   return (
  //     shouldRender
  //   );
  // }


  handleClick = (id) => {
    // console.log(id);
  }


  render() {



    // phone shortcut: "&#128222"

    // const styB = {border: "1px solid white", borderRadius: 5, fontSize: 11, color: "white"}


    if (this.isSimpleHeader()) {
      if (this.props.ui.orientation === "landscape") 
        return this.getMobileHeaderLandscape();
      return this.getMobileHeaderPortrait();
    }
     
    return this.getDesktopHeader();
  }

  getArrowIconLi = () => {
    const iconArrow = "fas fa-arrow-left";
    const iconHouse = "fas fa-home";
    // const iconArrow = "fas fa-arrow-circle-left";
    const arrowClass = this.props.currentPage === "gallery" ? "hidden" : "arrow expandable";
    return (
      <li className={arrowClass} onClick={() => this.props.history.push("/")}><i className={iconArrow}></i><i className={iconHouse}></i></li>
    )
  }

  getMainTitle = () => {
    let title = "losing my dimension";
    if (this.props.currentPage !== "gallery" && this.props.ui.width < 445) 
      title = <span className="xxsmallLogo">losing my<br></br>dimension</span>;
    return title;//"losing my dimension";
    // return this.props.currentPage; // === "gallery"?"losing my dimension":this.props.currentPage;
  }

  getHamburgerSub = () => {
    // const homeIcon = this.props.ui.isMobile?"fas fa-bars":"fa fa-cube";
    const homeIcon = "fas fa-bars";
    const hamburgerMenuItems = [
      { title: "about", link: "/about", shortcut: "" },
      { title: "statement", link: "/statement", shortcut: "" },
      { title: "thesis", link: "/thesis", shortcut: "" },
      
      // {title: "cookies", link:"/words", shortcut: "🍪"},
      { title: "credits", link: "/credits", shortcut: "" }
    ];

    return (
      <FinderSubmenu ui={this.props.ui} title="" currentPage={this.props.currentPage} icon={homeIcon} specialClass="apple bold" listItems={hamburgerMenuItems} />
    )
  }

  getMainTitleLi = () => {
    const sty1 = { fontSize: 9, color: "white", height: 20, padding: 0, margin: 0 }
    const sty2 = { fontSize: 12, color: "blue", height: 20, padding: 0, margin: 0 }
    return (
      <li>
        <div style={{ display: "flex", flexDirection: "column", height: 60 }}>
          <div style={sty1}>losing my dimension</div>
          <div style={sty2}>{this.props.currentPage}</div>
        </div>
      </li>
    )
  }

  getMainMenuSub = () => {
    const finderMenuItems = [
      // { title: "about", link: "/about", shortcut: "", classN: "about" },
      // { title: "spacer" },
      { title: "gallery", link: "/", shortcut: "&#x2318;0", classN: "gallery" },
      { title: "macbook air", link: "/macbook-air", shortcut: "&#x2318;1" },
      { title: "wet streams", link: "/wet-streams", shortcut: "&#x2318;2" },
      { title: "hard drives on seashores", link: "/hard-drives-on-seashores", shortcut: "&#x2318;3" },
      { title: "jungle gyms", link: "/jungle-gyms", shortcut: "&#x2318;4" },
      { title: "wasted days", link: "/wasted-days", shortcut: "&#x2318;5" },
      { title: "esc to mars", link: "/esc-to-mars", shortcut: "&#x2318;6" },
      { title: "xfinity depths", link: "/xfinity-depths", shortcut: "&#x2318;7" },
      { title: "cloud confessional", link: "/cloud-confessional", shortcut: "&#x2318;8" },
      { title: "blind eye", link: "/blind-eye", shortcut: "&#x2318;9" },
      { title: "flush", link: "/flush", shortcut: "&#x2318;10" },
      { title: "home page", link: "/home-page", shortcut: "&#x2318;11" },
      { title: "yosemite", link: "/yosemite", shortcut: "&#x2318;12" },
      // {title: "i got the feels", link:"/i-got-the-feels", shortcut: "&#x2318;8"},
      // {title: "losing my dimension", link:"/losing-my-dimension", shortcut: "&#x2318;9"},
    ];
    
    return (
      
      <FinderSubmenu ui={this.props.ui} currentPage={this.props.currentPage} title={this.getMainTitle()} icon="" specialClass="bold" listItems={finderMenuItems} />
    )
  }

  getDesktopHeader = () => {

    const headerClass = "Header menuTheme";

    return (
      <header className={headerClass}>
        <ul className="left">
          {this.getArrowIconLi()}
          {/*<FinderSubmenu cursor={`cursor-${this.state.hand}`} dimensions={this.props.dimensions} title="" icon="fa fa-cube" specialClass="apple" listItems={hamburgerMenuItems} /> */}
          {this.getHamburgerSub()}
          {this.getMainMenuSub()}
          {/* <li className={`expandable`}><Link to="/"><span id="pageTitle">Losing My Dimension</span></Link></li> */}
          {/* <li><span className="currentPage">/{this.props.currentPage}</span></li> */}
        </ul>
        <ul className="right">
          {this.getChatLi()}
          {/* <li className={classUserIcons} onClick={this.props.toggleUserIcons}><UsersIcon fontSize="inherit" /></li> */}
          {this.getMapLi()}
          {this.getFaqLi()}
          {this.getVolumeLi()}
          <li></li>
          <li><Clock /></li>
          <li></li>
          {this.getAvatarLi()}
          {/* <li className="expandable hamburger" onClick={this.props.toggleSideBar}><i className="fas fa-bars"></i></li>*/}
        </ul>
      </header>
    )
  }

  getMobileHeaderLandscape = () => {

    const headerClass = "Header menuTheme mobile";

    return (
      <header className={headerClass}>
        <ul className="left">
          {this.getArrowIconLi()}
          {this.getHamburgerSub()}
          {this.getMainMenuSub()}
          
          {/* {this.getMainTitleLi()} */}
        </ul>
      </header>
    )
  }

  getMobileHeaderPortrait = () => {

    const headerClass = "Header menuTheme mobile";

    return (
      <header className={headerClass}>
        <ul className="left">
          {this.getArrowIconLi()}
          {this.getMainMenuSub()}
          {/* {this.getMainTitleLi()} */}
        </ul>
        <ul className="right">
          {this.getHamburgerSub()}
        </ul>
      </header>
    )
  }


  toggleVolume = () => {
    this.setState(prevState => ({
      volumeMuted: !prevState.volumeMuted
    }));
  }

  isSimpleHeader() {
    const { ui } = this.props;
    return (ui.isMobile || ui.hasFooter);
  }

  chatClicked = () => {
    this.props.resetMessgeNotification();
    this.props.toggleChat();
  }

  volumeClicked = () => {
    this.props.toggleVolumeMenu();
  }

  getMobileRightMenus() {
    return (
      <ul className="right">
        <li className="header-avatar" onClick={this.props.avatarClicked}>{this.getAvatar()}</li>
      </ul>
    );
  }


  getVolumeLi = () => {
    const classVol = "expandable icon" + (this.props.volumeIsHidden ? " closed" : " opened");
    return (
      <li className={classVol} onClick={this.props.toggleVolumeMenu}>
        {/* <Volume isMuted={this.props.music.isMuted} /> */}
        {this.getVolumeIcon()}
      </li>
    )
  }

  getVolumeIcon = () => {
    const { music } = this.props;
    if (music.isMuted || music.volume == 0)
      return <VolumeOff />
    // else if (music.volume < .5)
    //   return <VolumeDown />
    return <VolumeUp />
  }

  getAvatarLi = () => {
    return (
      <li className="header-avatar expandable" onClick={this.props.avatarClicked}>
        {this.getAvatar()}
      </li>
    )
  }

  getFaqLi = () => {
    const classFaq = "expandable icon" + (this.props.faqIsHidden ? " closed" : " opened");

    return (
      <li className={classFaq} onClick={this.props.toggleFaq}>
        <HelpOutlineIcon fontSize="inherit" />
      </li>
    )
  }

  getMapLi = () => {
    var classMap = "icon";
    const isHome = this.props.user.room === "gallery";
    if (isHome) {
      classMap += (this.props.mapIsHidden ? " closed" : " opened");
      classMap += " expandable";
    }
    else classMap += " closed disabled";

    if (!isHome)
      return null;
    return (
      <li className={classMap} onClick={this.props.toggleMap} >
        <MapIcon fontSize="inherit" />
      </li >
    )
  }

  getChatLi = () => {
    var classChat = "expandable icon" + (this.props.chatIsHidden ? " closed" : " opened");
    if (this.props.chatNotifications)
      classChat += " notify";
    return (
      <li className={classChat} onClick={this.chatClicked}>
        <ChatIcon fontSize="inherit" />
        {this.getChatNotification()}
      </li>
    )
  }

  getChatNotification = () => {
    let n = this.props.chatNotifications;
    if (n) {
      if (n > 10)
        return (<div className="notification"><span className="badge"><NotifyIcon /></span></div>);
      return (<div className="notification"><span className="badge">{n}</span></div>);
    }
    return null;
  }

  getAvatar = () => {
    const { user } = this.props;
    if (user) {
      return (user.avatar);
    }
    return (
      <AccountCircleIcon />
    );
  }


}

const mapStateToProps = (state) => {
  return {
    chatIsHidden: state.chatIsHidden,
    faqIsHidden: state.faqIsHidden,
    mapIsHidden: state.mapIsHidden,
    volumeIsHidden: state.volumeIsHidden,
    userIconsIsHidden: state.userIconsIsHidden,
    chatNotifications: state.chatNotifications,
    music: state.music,
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    toggleMap,
    toggleFaq,
    toggleChat,
    toggleVolumeMenu,
    resetMessgeNotification,
    toggleUserIcons,
    toggleVolume,

  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps())(Header));
