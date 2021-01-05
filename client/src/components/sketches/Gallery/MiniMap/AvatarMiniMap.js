import React from 'react';
import { globalConfig } from '../constants';

class AvatarMiniMap extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    const {user, isUser, dim} = this.props;
    const scaler = dim/200;
    const miniScaler = 4*scaler;
    const miniX = 45*scaler;
    const miniY = 40*scaler;
    const bigScaler = globalConfig.scaler;
    const bigX = globalConfig.x;
    const bigY = globalConfig.y;
    const loc = {};

    loc.x = (user.x/bigScaler-bigX)*miniScaler+miniX;
    loc.y = (user.y/bigScaler-bigY)*miniScaler+miniY;

    const sty = {top: loc.y, left: loc.x};
    var avatar = user.avatar;
    if (user.userName === "wineBot") avatar = "🍷";
    else if (user.userName === "DJ") avatar = "🎧";
    else if (user.userName === "cheeseBot") avatar = "🧀";
    else if (user.userName === "cocktailBot") avatar = "🍸";
    else if (!isUser) avatar = "👤";
    const hidden = (user.room !== "gallery");

    return (

        <div className={"emojiMiniMap"+ (hidden?" hidden":"")} style={sty}>{avatar}</div>

    )

  }

}

export default AvatarMiniMap;
