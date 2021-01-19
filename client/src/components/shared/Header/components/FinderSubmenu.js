import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

class FinderSubmenu extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    }

    this.toggleHidden = this.toggleHidden.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isVisible: false
      })
    }
  }

  toggleHidden () {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  }

  render() {
    var title = this.props.title;
    var icon= "";
    if (title === "") {
      icon = <i className={this.props.icon}></i>
    }
    // const cursor = this.props.cursor;
    const specialClass = this.props.specialClass;
    let ulSpecialClass = this.props.ulSpecialClass?this.props.ulSpecialClass:"";
    if (this.getMobile()) 
      ulSpecialClass += " mobile";
    const listItems = this.props.listItems;

    let classN = this.getMobile() ? "" : "expandable"; 
    classN += specialClass ? (" " + specialClass): "";
    classN += this.state.isVisible ? ' selected': '';
    
    return (
      <li className={classN} onClick={this.toggleHidden} ref={this.setWrapperRef}>{this.getPageTitle()}
      {icon}
      <div className={`submenu ${this.state.isVisible ? 'visible': ''}`}>
        <ul className={ulSpecialClass}>
          {listItems.map((item, i) => {
            const classN = item.classN?item.classN:"";
            // if(item.title === "spacer") {
            //   if (this.getMobile()) 
            //     return null;
            //   return (
            //     <li className="spacer" key={i} />
            //   )
            // }
            return(
              <ListItem key={i} ui={this.props.ui} shortcut={item.shortcut} title={item.title} link={item.link} callback={item.callback} classN={classN} />)}
              )
            }  </ul>
          </div>
        </li>
      );
    }

    getPageTitle = () => {
      // if (this.getMobile() && this.props.title === "losing my dimension") {
      //   return (
      //     <div className="mobile-title">
      //       <div>losing my dimension</div>
      //       <div className="subtitle">{this.props.currentPage}</div>
      //     </div>
      //   )
      // }
      return(
        <span id="pageTitle">{this.props.title}</span>
      )
     
    }

    getMobile = () => {
      return this.props.ui.isMobile || this.props.ui.hasFooter;
    }

  }


  FinderSubmenu.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
    specialClass: PropTypes.string,
    listitems: PropTypes.array
  };

  export default FinderSubmenu
