import React from 'react';
import {Link} from 'react-router-dom';

class ListItem extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {title, link, ui, callback} = this.props;
    const shortcut = getShortcut(this.props.shortcut, ui.width);
    // let classn = (shortcut === '' || shortcut === null || ui.isMobile) ? 'noShortcut': 'shortcut';
    let classn = (shortcut === '' || shortcut === null) ? 'noShortcut': 'shortcut';


    if (link && link !== '') {
      return (
        <Link to={link}>
        <li key={title} className={classn}>{this.getMenuItem(title, shortcut)}</li>
        </Link>
      );
    }

    return (
      <li key={title} className={classn} onClick={callback} shortcut={shortcut}>{title}</li>
    );
  }

  getMenuItem = (title,shortcut) => {
    return (
      <div className="flexRow">
        <div className="title flex1">{title}</div>
        <div className="shortcut">{shortcut}</div>
      </div>
    )
  }
}

function getShortcut(shortcut, width) {
  // if (shortcut === null || shortcut === "" || width < 500) return null;
  if (shortcut === null || shortcut === "") 
    return null;

  const parser = new DOMParser();
  const parsedString = parser.parseFromString(shortcut, 'text/html');
  return parsedString.body.innerHTML;
}

export default ListItem
