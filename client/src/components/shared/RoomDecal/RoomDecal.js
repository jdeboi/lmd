import React from 'react';
import './RoomDecal.css';
// store
import { connect } from 'react-redux';
import { startComposition } from '../../../store/actions/';

import { getSketch, getRoomCount } from '../../sketches/Sketches';
import ReactTooltip from 'react-tooltip';
// components
import CenterModal from '../CenterModal/CenterModal';


class RoomDecal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        // this.enterButton = React.createRef();
    }

    // componentDidMount() {
    //     this.enterButton.current.focus();
    // }

    render() {
        const { ui, user, users, hasLoadedRoom } = this.props;
        const sketch = getSketch(user.room);
        if (sketch) {
            const buttons = this.getButtons(this.state.step);
            const { title, about, year } = sketch;
            return (
                <CenterModal
                    title={""}
                    isHidden={hasLoadedRoom}
                    onHide={this.props.onHide}
                    ui={ui}
                    z={2500}
                    height={300}
                    width={400}
                    isRelative={false}
                    classN="RoomDecal"
                    content={
                        <div className="decal-content">
                            <div className="identify">
                                {/* <p className="" style={{ fontSize: 12, paddingBottom: 0 }}>Jenna deBoisblanc</p>
                                <p style={{ paddingBottom: 20 }}>
                                    <span style={{ fontSize: 24 }}>🇺🇸⚜️</span>
                                    <span style={{ fontSize: 12 }}>, born 1989</span>
                                </p> */}
                                <p style={{ fontSize: 20, paddingBottom: 0, fontWeight: 900 }}>
                                    <span className="">{title}</span>
                                </p>
                                <p style={{ fontSize: 12 }}>{year}</p>
                                <p style={{ fontSize: 12 }}>Custom Software</p>
                                <p style={{ fontSize: 12 }}>Variable Dimensions</p>

                                {/* <p style={{ fontSize: 12 }}>{about}</p> */}

                                {/* <hr></hr> */}
                            </div>
                            {/* <div></div> */}

                            {/* {this.getParticipantsBox()} */}

                        </div>
                    }
                    buttons={buttons}
                />
            );
        }


        return null;

    }

    setUserHover = (user) => {

    }

    userHoverLeave = () => {

    }

    getParticipantsBox = () => {
        const { ui, user, users } = this.props;
        if (ui.hasFooter && ui.orientation === "landscape")
            return null;
        return (
            <div className="participants-box">
                <br />
                <br />
                <div className="usersEye"><i className="fas fa-eye"></i> {getRoomCount(user.room, users)}</div>
                <br />
                <br />
                <div className="participants">
                    <span
                        data-tip={"me"}
                    >
                        {user.avatar}

                    </span>
                    {/* {this.getFakeUsers()} */}
                    {this.getUsers()}

                </div>
                <ReactTooltip />
            </div>
        )

    }

    getFakeUsers = () => {
        const { user } = this.props;
        const users = [
            { avatar: "🤣", userName: "bob" },
            { avatar: "🎃", userName: "george" },
            { avatar: "🤢", userName: "hannah" },
            { avatar: "🤪", userName: "jdeboisblanc" },
            { avatar: "🥵", userName: "ok" },
            { avatar: "😎", userName: "ashley123" },
            { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },

            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
            // { avatar: "🤣", userName: "bob" },
            // { avatar: "🎃", userName: "george" },
            // { avatar: "🤢", userName: "hannah" },
            // { avatar: "🤪", userName: "jdeboisblanc" },
            // { avatar: "🥵", userName: "ok" },
            // { avatar: "😎", userName: "ashley123" },
        ]
        return users.map((usr, i) => {
            return (
                <span
                    key={i}
                    // onMouseEnter={() => this.setUserHover(user)}
                    // onMouseLeave={() => this.userHoverLeave()}
                    // onClick={() => this.userClick(user)}
                    data-tip={usr.userName}
                >
                    {usr.avatar}

                </span>
            )
        });

    }

    getUsers = () => {
        const { users, user } = this.props;

        return users.map((usr, i) => {
            if (usr.room !== user.room)
                return null;
            return (
                <span
                    key={i}
                    // onMouseEnter={() => this.setUserHover(user)}
                    // onMouseLeave={() => this.userHoverLeave()}
                    // onClick={() => this.userClick(user)}
                    data-tip={usr.userName}
                >
                    {usr.avatar}

                </span>
            )
        })

        return <div></div>;

    }

    buttonClicked = () => {
        this.props.startComposition();
        this.props.onHide();
    }

    getButtons = (step) => {
        return (
            <div className="center-buttons">
                <button className="standardButton primary" onClick={this.buttonClicked}>ok</button>
            </div>
        );

    }



}


const mapStateToProps = (state) => {
    return {
        ui: state.ui,
        user: state.user
    }
}

const mapDispatchToProps = () => {
    return {
        startComposition
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(RoomDecal);
