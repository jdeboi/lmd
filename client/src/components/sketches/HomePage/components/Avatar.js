
import React from 'react';
import { showWine, showCocktail, showCheese } from './Helpers';

function Avatar(props) {
  const { user, avatarW } = props;
  const showWineEmoji = showWine(user);
  const showCheeseEmoji = showCheese(user);
  const showCocktailEmoji = showCocktail(user);
  return (
    <div className="userAvatar avatar" style={{ top: window.innerHeight / 2 - avatarW / 2, left: window.innerWidth / 2 - avatarW / 2, zIndex: 10 }}>
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

export default Avatar;
