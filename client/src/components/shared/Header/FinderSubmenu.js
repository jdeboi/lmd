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
    let ulSpecialClass = this.props.ulSpecialClass;
    if (this.props.ui.isMobile || this.props.ui.hasFooter) 
      ulSpecialClass += " mobile";
    const listItems = this.props.listItems;

    let classN = this.props.ui.isMobile ? "" : "expandable"; 
    classN += specialClass ? (" " + specialClass): "";
    classN += this.state.isVisible ? ' selected': '';
    
    return (
      <li className={classN} onClick={this.toggleHidden} ref={this.setWrapperRef}><span id="pageTitle">{title}</span>
      {icon}
      <div className={`submenu ${this.state.isVisible ? 'visible': ''}`}>
        <ul className={ulSpecialClass}>
          {listItems.map((item) => {
            return(
              <ListItem key={item.title} ui={this.props.ui} shortcut={item.shortcut} title={item.title} link={item.link} callback={item.callback} />)}
              )
            }  </ul>
          </div>
        </li>
      );
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
