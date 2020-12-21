

import React from 'react';
import OtherAvatars from './OtherAvatars';
import Avatar from './Avatar';
import { connect } from 'react-redux';
import { moveUserRoom } from '../../../store/actions/user';

import './RoomUsers.css';

class RoomUsers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            destination: null,
            isWalking: false
        }

        this.space = 50;
    }

    componentWillUnmount() {
        if (this.walkingInterval) clearInterval(this.walkingInterval);
    }

    render() {
        const { users, user, ui } = this.props;
        const avatarW = 34;
        const isVisible = !ui.loading;
        const isHomePage = user.room === "home-page";
        return (
            <div className="avatars"
                onClick={this.handleEvent}
                style={{
                    display: isHomePage ? "block": "none",
                    width: ui.width,
                    height: ui.height,
                    pointerEvents: "none", //isHomePage ? "none" : "all",
                    visibility: (isVisible ? "visible" : "hidden")
                }}>
                <OtherAvatars users={users} avatarW={avatarW} />
                <Avatar avatarW={avatarW} />
            </div>
        )

    }

    handleEvent = (event) => {

        if (this.props.user.room !== "home-page") {
            const isWalking = true;
            const destination = { x: event.clientX, y: event.clientY };
            this.setState({ destination, isWalking })
            this.walkingInterval = setInterval(this.takeStep, 100);
        }
    }

    takeStep = () => {
        if (this.state.isWalking) {
            const { user } = this.props;
            const { destination } = this.state;

            const start = { x: user.roomX, y: user.roomY }
            const step = getNextStep(start, destination, this.space);
            const x = step[0] * this.space + this.props.user.roomX;
            const y = step[1] * this.space + this.props.user.roomY;
            this.props.moveUserRoom(x, y);

            if (atDestination({ x, y }, destination, this.space)) {
                this.setState({ isWalking: false });
                clearInterval(this.walkingInterval);
            }
        }

    }

}

const atDestination = (start, destination, space) => {
    return getStepDist(start, destination, 0, [0, 0]) <= space;
}
// TODO - probably a more efficient way to determine best step...
const getNextStep = (start, end, space) => {
    let steps = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let min = 1000000;
    let index = 0;
    let i = 0;
    for (const step of steps) {
        let stepDis = getStepDist(start, end, space, step);
        if (stepDis < min) {
            min = stepDis;
            index = i;
        }
        i++;
    }
    return steps[index];
}

const getStepDist = (start, end, space, step) => {
    const dx = end.x - (start.x + step[0] * space);
    const dy = end.y - (start.y + step[1] * space);
    return Math.sqrt(dx * dx + dy * dy);
}

const mapStateToProps = (state) => {
    return {
        ui: state.ui,
        user: state.user
    }
}

const mapDispatchToProps = () => {
    return {
        moveUserRoom
    }
}



export default connect(mapStateToProps, mapDispatchToProps())(RoomUsers);

