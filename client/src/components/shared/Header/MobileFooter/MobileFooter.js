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
import { setOneMenu, toggleMap, toggleFaq, toggleChat, toggleUserIcons } from '../../../../store/actions/menuItems';
import { resetMessgeNotification } from '../../../../store/actions/messages';


class MobileFooter extends React.Component {

    //
    render() {
        var classChat = "icon" + (this.props.menu === "chat" ? " opened" : " closed");
        if (this.props.chatNotifications) classChat += " notify";
        
        var classMap = "icon";
        if (this.props.user.room === "home-page") {
            classMap += (this.props.menu === "map" ? " opened" : " closed");
        }
        else classMap += " closed disabled";
        
        const classFaq = "icon" + (this.props.menu === "faq" ? " opened" : " closed");
        // const classUserIcons = "expandable icon" + (this.props.userIconsIsHidden ? " closed" : " opened");

        const classUser = "icon" + (this.props.menu === "user" ? " opened" : " closed");

        // const sty = {top: this.props.ui.height-60};
        if (this.hasFooter()) {
            return (
                <div className="MobileFooter">
                    {this.props.user.room === "home-page"?<button className={classMap} onClick={() => this.props.setOneMenu("map")}><MapIcon fontSize="inherit" /></button>:null}
                    <button className={classChat} onClick={this.chatClicked}><ChatIcon fontSize="inherit" />{this.getChatNotification()}</button>
                    <button className={classFaq} onClick={() => this.props.setOneMenu("faq")}><HelpOutlineIcon fontSize="inherit" /></button>
                    <button className={classUser} onClick={() => this.props.setOneMenu("user")}><AccountCircleIcon fontSize="inherit" /></button>
                </div>
            )
        }
        return null;
    }

    hasFooter() {
        const { ui } = this.props;
        return ui.isMobile || ui.size == "xsmall" || ui.size == "small";
    }

    chatClicked = () => {
        this.props.resetMessgeNotification();
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
        chatIsHidden: state.chatIsHidden,
        faqIsHidden: state.faqIsHidden,
        mapIsHidden: state.mapIsHidden,
        userIconsIsHidden: state.userIconsIsHidden,
        chatNotifications: state.chatNotifications,
        ui: state.ui,
        menu: state.menu
    }
}

const mapDispatchToProps = () => {
    return {
        toggleMap,
        toggleFaq,
        toggleChat,
        resetMessgeNotification,
        toggleUserIcons,
        setOneMenu
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps())(MobileFooter));

