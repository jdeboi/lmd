import React from 'react';
import Frame from '../../../shared/Frame/Frame';
import AvatarMiniMap from './AvatarMiniMap';

import { connect } from 'react-redux';
import { hideMap, toggleMap } from '../../../../store/actions/';


class MiniMap extends React.Component {

  constructor(props) {
    super(props);

  }

  onHide = () => {
    this.props.hideMap();
  }

  render() {
    const {users, user, x, y, z, wineLocation} = this.props;

    const wine0 = {...wineLocation[0]};
    wine0.room="home-page";
    const wine1 = {...wineLocation[1]};
    wine1.room="home-page";

    // if (otherUser.userName=="jdboi") console.log(otherUser.x, otherUser.y);
    return (
      <Frame title="map" isHidden={this.props.mapIsHidden} onHide={this.onHide} bounded={true} windowStyle={{background: "rgba(255, 255, 255, .9)"}} content={
          /*<video width={dimW-2} height={dimH} muted loop autoPlay><source src={videoDimURL} type="video/mp4"></source></video>*/
          <div className="MiniMap">
            <img src={window.AWS + "/homePage/miniMap.png"} width="100%" height="100%" />;
            <div className="otherAvatarsMiniMap">
              <div className="avatars">
                {users?this.getUsers():<div></div>}
                <AvatarMiniMap user={user} isUser={true} />

              </div>
            </div>
          </div>
        }
        width={200} height={200} x={x} y={y} z={1000}
        />

    )

  }

  getUsers = () => {
    return (
      this.props.users.map((otherUser, i) => {
        return (
          <AvatarMiniMap key={i} user={otherUser} isUser={false} />
        )
      })
    )
  }

}

const mapStateToProps = (state) => {
 return {
   mapIsHidden: state.mapIsHidden
 }
}

const mapDispatchToProps = () => {
 return {
   hideMap,
   toggleMap
 }
}


export default connect(mapStateToProps, mapDispatchToProps())(MiniMap);
