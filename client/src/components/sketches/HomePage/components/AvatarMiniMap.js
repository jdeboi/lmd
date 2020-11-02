import React from 'react';

class AvatarMiniMap extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    const {user, isUser} = this.props;
    const miniScaler = 4;
    const miniX = 45;
    const miniY = 40;
    const bigScaler = 50;
    const bigX = -15;
    const bigY = -35;
    const loc = {};

    loc.x = (user.x/bigScaler-bigX)*miniScaler+miniX;
    loc.y = (user.y/bigScaler-bigY)*miniScaler+miniY;

    const sty = {top: loc.y, left: loc.x};
    var avatar = user.avatar;
    if (user.userName === "wineBot") avatar = "🍷";
    else if (user.userName === "DJ") avatar = "🎧";
    else if (!isUser) avatar = "👤";
    const hidden = (user.room !== "home-page");
    // if (user.userName=="firefox") console.log(user.x, loc.x);

    //    <div className={"otherAvatarMiniMap" + (hidden?" hidden":"")}>
    //       </div>
    return (

        <div className={"emojiMiniMap"+ (hidden?" hidden":"")} style={sty}>{avatar}</div>

    )

  }

}

export default AvatarMiniMap;
