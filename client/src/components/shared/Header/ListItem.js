import React from 'react';
import {Link} from 'react-router-dom';

const ListItem = (props) => {


    const {title, link, cursor, dimensions} = props;
    const shortcut = getShortcut(props.shortcut, dimensions.windowWidth);
    let classn = (shortcut === '' || shortcut === null || dimensions.device === "mobile") ? 'noShortcut': 'shortcut';

    // if (dimensions.windowWidth < 500) {
    //   classn += " lined";
    // }

    if (link && link !== '') {
      return (
        <Link className={cursor} to={link}>
        <li key={title} className={classn} shortcut={shortcut}>{title}</li>
        </Link>
      );
    }
    return (
      <li key={title} className={classn} onClick={props.callback} shortcut={shortcut}>{title}</li>
    );
}

function getShortcut(shortcut, width) {
  if (shortcut === null || shortcut === "" || width < 500) return null;
  const parser = new DOMParser();
  const parsedString = parser.parseFromString(shortcut, 'text/html');
  return parsedString.body.innerHTML;
}

export default ListItem
