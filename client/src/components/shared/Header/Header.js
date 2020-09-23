import React from 'react';
import './Header.css';
import FinderSubmenu from './FinderSubmenu';
import {Link} from 'react-router-dom';
import Clock from './Clock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
      // {title: "i got the feels", link:"/i-got-the-feels", shortcut: "&#x2318;8"},
      // {title: "losing my dimension", link:"/losing-my-dimension", shortcut: "&#x2318;9"},
    ];

    const hamburgerMenuItems = [
      {title: "statement", link:"/words", shortcut: "&#128222"},
      // {title: "cookies", link:"/words", shortcut: "🍪"},
      {title: "credits", link:"/credits", shortcut: ""},
    ];


    return (

      <header className="Header menuTheme">
        <ul className="left">
          {/*<FinderSubmenu cursor={`cursor-${this.state.hand}`} dimensions={this.props.dimensions} title="" icon="fa fa-cube" specialClass="apple" listItems={hamburgerMenuItems} /> */}
          <FinderSubmenu dimensions={this.props.dimensions} title="" icon="fa fa-cube" specialClass="apple" listItems={hamburgerMenuItems} />
          <FinderSubmenu dimensions={this.props.dimensions} title="losing my dimension" icon="" specialClass="bold" listItems={finderMenuItems} />
          {/*<li className={`expandable`}><Link to="/"><span id="pageTitle">Losing My Dimension</span></Link></li>*/}
        </ul>
        {this.props.dimensions.device==="desktop"?this.getRightMenus():<div></div>}
      </header>
    );
  }

  getRightMenus() {

    return(
      <ul className="right">
        <li onClick={this.props.userClicked}>{this.getAvatar()}</li>
        <li><Clock /></li>
        <li onClick={this.props.toggleSideBar}><button><i className="fas fa-bars"></i></button></li>
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

export default Header
