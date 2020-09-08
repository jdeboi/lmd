import React from 'react';
import ListItem from './ListItem';

class FinderSubmenu extends React.Component {

  constructor(props) {
    super(props);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.state = {
      isVisible: false
    }
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
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  render() {
    var title = this.props.title;
    var icon= "";
    if (title === "") {
      icon = <i className={this.props.icon}></i>
    }
    const cursor = this.props.cursor;
    const specialClass = this.props.specialClass;
    let ulSpecialClass = this.props.ulSpecialClass;
    if (this.props.dimensions.device === "mobile") ulSpecialClass += " mobile";
    const listItems = this.props.listItems;

    let style = {};
    return (
      <li className={`expandable ${specialClass} ${this.state.isVisible ? 'selected': ''}`} onClick={this.toggleHidden} ref={this.setWrapperRef}><span id="pageTitle">{title}</span>
      {icon}
      <div className={`submenu ${this.state.isVisible ? 'visible': ''}`}>
      <ul className={ulSpecialClass}>
      {listItems.map((item) => {
        return(
          <ListItem key={item.title} dimensions={this.props.dimensions} shortcut={item.shortcut} cursor={cursor} title={item.title} link={item.link} callback={item.callback} />)}
        )
      }  </ul>
      </div>
      </li>
    );
  }


}

export default FinderSubmenu
