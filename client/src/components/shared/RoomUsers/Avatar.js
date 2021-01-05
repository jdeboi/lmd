
import React from 'react';
import { showWine, showCocktail, showCheese } from '../../sketches/Gallery/components/Helpers';
import { connect } from 'react-redux';

function Avatar(props) {
  const { user, avatarW, ui } = props;
  const showWineEmoji = showWine(user);
  const showCheeseEmoji = showCheese(user);
  const showCocktailEmoji = showCocktail(user);
  const loc = { x: ui.width / 2 - avatarW / 2, y: ui.height / 2 + avatarW / 2};
  
  if (user.room !== "gallery") {
    loc.x = user.roomX;
    loc.y = user.roomY;
  }

  return (
    <div className="userAvatar avatar" style={{top: loc.y, left: loc.x, zIndex: 10}}>
      <div>{user.avatar}</div>
      <div className="emoji-addons">
        <div className={"emoji-item emoji-wine" + (showWineEmoji ? "" : " hidden")}>🍷</div>
        <div className={"emoji-item emoji-cocktail" + (showCocktailEmoji?"":" hidden")}>🍸</div>
        <div className={"emoji-item emoji-bread" + (showCheeseEmoji?"":" hidden")}>🥖</div>
        <div className={"emoji-item emoji-cheese" + (showCheeseEmoji?"":" hidden")}>🧀</div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    user: state.user
  }
}

const mapDispatchToProps = () => {
  return {
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Avatar);

