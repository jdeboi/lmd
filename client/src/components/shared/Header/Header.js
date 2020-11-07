import React from 'react';
import './Header.css';
import FinderSubmenu from './FinderSubmenu';
import {Link} from 'react-router-dom';
import Clock from './Clock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import MapIcon from '@material-ui/icons/Room';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import UsersIcon from '@material-ui/icons/SupervisedUserCircle';

// store
import { connect } from 'react-redux';
import { toggleMap, toggleFaq, toggleChat, toggleUserIcons } from '../../../store/actions/';


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
      showSideBar: true
    }

    this.getRightMenus = this.getRightMenus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getAvatar = this.getAvatar.bind(this);

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


  handleClick(id) {
    console.log(id);
  }


  render() {

    const finderMenuItems = [
      {title: "homepage", link:"/", shortcut: "&#x2318;0"},
      {title: "macbook air", link:"/macbook-air", shortcut: "&#x2318;1"},
      {title: "wet streams", link:"/wet-streams", shortcut: "&#x2318;2"},
      {title: "hard drives on seashores", link:"/hard-drives-on-seashores", shortcut: "&#x2318;3"},
      {title: "jungle gyms", link:"/jungle-gyms", shortcut: "&#x2318;4"},
      {title: "wasted days are days wasted", link:"/wasted-days-are-days-wasted", shortcut: "&#x2318;5"},
      {title: "esc to mars", link:"/esc-to-mars", shortcut: "&#x2318;6"},
      {title: "xfinity depths", link:"/xfinity-depths", shortcut: "&#x2318;7"},
      {title: "cloud confessional", link:"/cloud-confessional", shortcut: "&#x2318;8"},
      {title: "blind eye", link:"/blind-eye", shortcut: "&#x2318;9"},
      {title: "flush", link:"/flush", shortcut: "&#x2318;10"},
      {title: "house view", link:"/house-view", shortcut: "&#x2318;11"},
      // {title: "i got the feels", link:"/i-got-the-feels", shortcut: "&#x2318;8"},
      // {title: "losing my dimension", link:"/losing-my-dimension", shortcut: "&#x2318;9"},
    ];

    // phone shortcut: "&#128222"
    const hamburgerMenuItems = [
      {title: "about", link:"/about", shortcut: ""},
      {title: "contact", link:"/contact", shortcut: ""},
      // {title: "cookies", link:"/words", shortcut: "🍪"},
      {title: "credits", link:"/credits", shortcut: ""}
    ];
    // console.log("page", this.props.currentPage);

    return (

      <header className="Header menuTheme">
        <ul className="left">
          {/*<FinderSubmenu cursor={`cursor-${this.state.hand}`} dimensions={this.props.dimensions} title="" icon="fa fa-cube" specialClass="apple" listItems={hamburgerMenuItems} /> */}
          <FinderSubmenu dimensions={this.props.dimensions} title="" icon="fa fa-cube" specialClass="apple" listItems={hamburgerMenuItems} />
          <FinderSubmenu dimensions={this.props.dimensions} title="losing my dimension" icon="" specialClass="bold" listItems={finderMenuItems} />
          {/* <li><span className="currentPage">{this.props.currentPage}</span></li>*/}
          {/*<li className={`expandable`}><Link to="/"><span id="pageTitle">Losing My Dimension</span></Link></li>*/}
        </ul>
        {this.props.dimensions.device==="desktop"?this.getRightMenus():<div></div>}
      </header>
    );
  }

  getRightMenus() {
    //<button className="hamburger-button">
    const classChat = "expandable icon" + (this.props.chatIsHidden?" closed":" opened");
    var classMap = "icon";
    if (this.props.user.room === "home-page") {
      classMap += (this.props.mapIsHidden?" closed":" opened");
      classMap += " expandable";
    }
    else classMap += " closed disabled";
    const classFaq = "expandable icon" + (this.props.faqIsHidden?" closed":" opened");
    const classUserIcons = "expandable icon" + (this.props.userIconsIsHidden?" closed":" opened");
    return(
      <ul className="right">
        <li className={classChat} onClick={this.props.toggleChat}><ChatIcon /></li>
        <li className={classUserIcons} onClick={this.props.toggleUserIcons}><UsersIcon /></li>
        <li className={classMap} onClick={this.props.toggleMap}><MapIcon /></li>
        <li className={classFaq} onClick={this.props.toggleFaq}><HelpOutlineIcon /></li>

        <li></li>
        <li><Clock /></li>
        <li></li>
        <li className="header-avatar expandable" onClick={this.props.avatarClicked}>{this.getAvatar()}</li>

        {/* <li className="expandable hamburger" onClick={this.props.toggleSideBar}><i className="fas fa-bars"></i></li>*/}
      </ul>
    );
  }

  getAvatar() {
    const {user} = this.props;
    if (user) {
      return (user.avatar);
    }
    return(
      <AccountCircleIcon />
    );
  }


}

const mapStateToProps = (state) => {
  return {
    chatIsHidden: state.chatIsHidden,
    faqIsHidden: state.faqIsHidden,
    mapIsHidden: state.mapIsHidden,
    userIconsIsHidden: state.userIconsIsHidden
  }
}

const mapDispatchToProps = () => {
  return {
    toggleMap,
    toggleFaq,
    toggleChat,
    toggleUserIcons
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Header);
