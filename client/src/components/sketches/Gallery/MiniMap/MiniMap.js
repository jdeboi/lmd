import React from 'react';
import Frame from '../../../shared/Frame/Frame';
import AvatarMiniMap from './AvatarMiniMap';

import { connect } from 'react-redux';
import { setOneMenu, hideMap, toggleMap } from '../../../../store/actions/menuItems';


class MiniMap extends React.Component {

  // constructor(props) {
  //   super(props);

  // }

  componentDidMount() {
    const {hasFooter, isMobile} = this.props.ui;
    
    if (!isMobile && !hasFooter) {
      this.props.toggleMap();
    }
  }

  onHide = () => {
    this.props.hideMap();
    // this.props.setOneMenu(null);
  }

  render() {
    const {users, user, x, y, wineLocation, ui} = this.props;

    const wine0 = {...wineLocation[0]};
    wine0.room="gallery";
    const wine1 = {...wineLocation[1]};
    wine1.room="gallery";

    let isHidden = (ui.isMobile || ui.hasFooter) ? this.props.menu.mobile !== "map" : this.props.menu.isMapHidden;

    const dim = (ui.isMobile || ui.hasFooter) ? 135 : 200;
    // if (otherUser.userName=="jdboi") console.log(otherUser.x, otherUser.y);
    return (
      <Frame title="map" isHidden={isHidden} onHide={this.onHide} bounded={true} windowStyle={{background: "rgba(255, 255, 255, .9)"}} content={
          /*<video width={dimW-2} height={dimH} muted loop autoPlay><source src={videoDimURL} type="video/mp4"></source></video>*/
          <div className="MiniMap">
            <img src={window.AWS + "/gallery/miniMap.png"} width="100%" height="100%" />
            <div className="otherAvatarsMiniMap">
              <div className="mini-avatars">
                {users?this.getUsers(dim):null}
                <AvatarMiniMap dim={dim} user={user} isUser={true} />

              </div>
            </div>
          </div>
        }
        width={dim} height={dim} x={x} y={y} z={1000}
        />

    )

  }

  getUsers = (dim) => {
    return (
      this.props.users.map((otherUser, i) => {
        return (
          <AvatarMiniMap key={i} dim={dim} user={otherUser} isUser={false} />
        )
      })
    )
  }

}

const mapStateToProps = (state) => {
 return {
   ui: state.ui,
   menu: state.menu
 }
}

const mapDispatchToProps = () => {
 return {
   hideMap,
   toggleMap,
   setOneMenu
 }
}


export default connect(mapStateToProps, mapDispatchToProps())(MiniMap);
