import React from 'react';
import {Link} from 'react-router-dom';

class ListItem extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {title, link, ui, callback} = this.props;
    const shortcut = getShortcut(this.props.shortcut, ui.width);
    let classn = (shortcut === '' || shortcut === null || ui.isMobile) ? 'noShortcut': 'shortcut';


    if (link && link !== '') {
      return (
        <Link to={link}>
        <li key={title} className={classn} shortcut={shortcut}>{title}</li>
        </Link>
      );
    }

    return (
      <li key={title} className={classn} onClick={callback} shortcut={shortcut}>{title}</li>
    );
  }
}

function getShortcut(shortcut, width) {
  if (shortcut === null || shortcut === "" || width < 500) return null;
  const parser = new DOMParser();
  const parsedString = parser.parseFromString(shortcut, 'text/html');
  return parsedString.body.innerHTML;
}

export default ListItem
