import React from 'react';
import { connect } from 'react-redux';

class ViewUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        const { users, user } = this.props;
        const computerUsers = users.filter((user) => user.comp != null);
        console.log(users, user);
        return (
            <div className="View-Users">
                {computerUsers.map((user) => {
                    return <div>{user.avatar}</div>
                })}
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

    }
}



export default connect(mapStateToProps, mapDispatchToProps())(ViewUsers);

