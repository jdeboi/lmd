import React from 'react';
import './MobileFooter.css';
import { withRouter } from "react-router-dom";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import NotifyIcon from '@material-ui/icons/Notifications'
import MapIcon from '@material-ui/icons/Room';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

// store
import { connect } from 'react-redux';
import { showMap, showFaq, showChat, showSignIn, setOneMenu } from '../../../../store/actions/menuItems';
import { resetMessgeNotification } from '../../../../store/actions/messages';


class MobileFooter extends React.Component {

    //
    render() {
        const { ui, menu, chatNotifications, user } = this.props;
        var footerClass = "MobileFooter" + (ui.orientation === "landscape" ? " landscape" : "");




        // const sty = {top: this.props.ui.height-60};
        if (this.hasFooter()) {
            return (
                <div className={footerClass}>
                    {this.props.user.room === "gallery" ? this.getMapButton() : null}
                    {/* this.getGalleryButton()} */}
                    {this.getChatButton()}
                    {this.getFAQButton()}
                    {this.getSignInButton()}
                </div>
            )
        }
        return null;
    }

    goToGallery = () => {
        if (window.confirm('Go back to main gallery?')) {
            this.props.history.push("/");
        }
    }

    getSignInButton = () => {
        const { menu } = this.props;
        ////////// USER CLASS
        const classUser = "icon" + (menu.mobile === "signIn" ? " opened" : " closed");
        return (
            <button className={classUser} onClick={() => this.props.setOneMenu("signIn")}><AccountCircleIcon fontSize="inherit" /></button>
        )
    }

    getChatButton = () => {
        const { menu, chatNotifications, user } = this.props;
        ////////// CHAT CLASS
        var classChat = "icon" + (menu.mobile === "chat" ? " opened" : " closed");
        if (chatNotifications) classChat += " notify";
        if (user.room !== "gallery") {
            classChat += " top";
        }
        return (
            <button className={classChat} onClick={this.chatClicked}><ChatIcon fontSize="inherit" />{this.getChatNotification()}</button>
        )
    }

    getFAQButton = () => {
        const { menu } = this.props;
        ////////// FAQ CLASS
        const classFaq = "icon" + (menu.mobile === "faq" ? " opened" : " closed");
        // const classUserIcons = "expandable icon" + (this.props.userIconsIsHidden ? " closed" : " opened");

        return (
            <button className={classFaq} onClick={() => this.props.setOneMenu("faq")}><HelpOutlineIcon fontSize="inherit" /></button>
        )
    }

    getMapButton = () => {
        const { menu, user } = this.props;
        ////////// MAP CLASS
        var classMap = "icon";
        if (user.room === "gallery") {
            classMap += (menu.mobile === "map" ? " opened" : " closed");
            classMap += " top";
        }
        else classMap += " closed disabled";

        return (
            <button className={classMap} onClick={() => this.props.setOneMenu("map")}><MapIcon fontSize="inherit" /></button>
        )
    }

    getGalleryButton = () => {
        // const { ui, menu, chatNotifications, user } = this.props;
        return (
            <button onClick={this.goToGallery}>
                <img src={window.AWS + "/shared/homeicon.png"}
                    style={{
                        height: 30,
                        width: 30
                    }}
                />
            </button>
        )
    }

    hasFooter = () => {
        const { ui } = this.props;
        return (ui.isMobile || ui.hasFooter);
    }

    chatClicked = () => {
        this.props.resetMessgeNotification();
        // this.props.setOneMenu("chat");
        this.props.setOneMenu("chat");
    }

    getChatNotification = () => {
        let n = this.props.chatNotifications;
        if (n) {
            if (n > 10)
                return (<div className="notification"><span className="badge"><NotifyIcon /></span></div>);
            return (<div className="notification"><span className="badge">{n}</span></div>);
        }
        return null;
    }

    getAvatar = () => {
        const { user } = this.props;
        if (user) {
            return (user.avatar);
        }
        return (
            <AccountCircleIcon />
        );
    }

}



const mapStateToProps = (state) => {
    return {
        chatNotifications: state.chatNotifications,
        ui: state.ui,
        menu: state.menu
    }
}

const mapDispatchToProps = () => {
    return {
        resetMessgeNotification,
        setOneMenu,
        showFaq,
        showSignIn,
        showChat,
        showMap
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps())(MobileFooter));

