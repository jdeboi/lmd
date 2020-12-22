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
        const {ui, menu, chatNotifications, user}  = this.props;
        var footerClass = "MobileFooter" + (ui.orientation === "landscape"?" landscape":"");
        
        ////////// CHAT CLASS
        var classChat = "icon" + (menu === "chat" ? " opened" : " closed");
        if (chatNotifications) classChat += " notify";
        if (user.room !== "home-page") {
            classChat += " top";
        }
        
        ////////// MAP CLASS
        var classMap = "icon";
        if (user.room === "home-page") {
            classMap += (menu === "map" ? " opened" : " closed");
            classMap += " top";
        }
        else classMap += " closed disabled";
        
        ////////// FAQ CLASS
        const classFaq = "icon" + (menu === "faq" ? " opened" : " closed");
        // const classUserIcons = "expandable icon" + (this.props.userIconsIsHidden ? " closed" : " opened");
        
        ////////// USER CLASS
        const classUser = "icon" + (menu === "user" ? " opened" : " closed");

        // const sty = {top: this.props.ui.height-60};
        if (this.hasFooter()) {
            return (
                <div className={footerClass}>
                    {this.props.user.room === "home-page"?<button className={classMap} onClick={() => this.props.setOneMenu("map")}><MapIcon fontSize="inherit" /></button>:null}
                    <button className={classChat} onClick={this.chatClicked}><ChatIcon fontSize="inherit" />{this.getChatNotification()}</button>
                    <button className={classFaq} onClick={() => this.props.setOneMenu("faq")}><HelpOutlineIcon fontSize="inherit" /></button>
                    <button className={classUser} onClick={() => this.props.setOneMenu("user")}><AccountCircleIcon fontSize="inherit" /></button>
                </div>
            )
        }
        return null;
    }

    hasFooter = () => {
        const { ui } = this.props;
        return (ui.isMobile || ui.hasFooter);
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

