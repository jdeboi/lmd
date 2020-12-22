import React from 'react';
import Frame from '../../../shared/Frame/Frame';
import AvatarMiniMap from './AvatarMiniMap';

import { connect } from 'react-redux';
import { setOneMenu, hideMap, toggleMap } from '../../../../store/actions/menuItems';


class MiniMap extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const {size, isMobile} = this.props.ui;
    
    if (!isMobile && size !== "xsmall" && size !== "small") {
      this.props.toggleMap();
    }
  }

  onHide = () => {
    this.props.hideMap();
    this.props.setOneMenu(null);
  }

  render() {
    const {users, user, x, y, wineLocation} = this.props;

    const wine0 = {...wineLocation[0]};
    wine0.room="home-page";
    const wine1 = {...wineLocation[1]};
    wine1.room="home-page";

    let isHidden = this.props.ui.isMobile ? this.props.menu !== "map" : this.props.mapIsHidden;

    // if (otherUser.userName=="jdboi") console.log(otherUser.x, otherUser.y);
    return (
      <Frame title="map" isHidden={isHidden} onHide={this.onHide} bounded={true} windowStyle={{background: "rgba(255, 255, 255, .9)"}} content={
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
   mapIsHidden: state.mapIsHidden,
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
