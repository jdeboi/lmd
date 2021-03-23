import React from 'react';
import './RegisterDesktop.css';
import { connect } from 'react-redux';
import { setUserComp } from '../../../store/actions/user';

// import { Link } from 'react-router-dom';

class RegisterDesktop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            computerNumber: 0
        }
    }

    handleChange = (event) => {
        this.setState({ computerNumber: event.target.value });
    }

    handleSubmit = (event) => {
        this.props.setUserComp(this.state.computerNumber);
        alert('Computer set to: ' + this.state.computerNumber);
        event.preventDefault();

    }

    render() {
        return (
            <div className="Desktop-Register Sketch">
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Computer number:
                        <input type="text" value={this.state.computerNumber} onChange={this.handleChange} />
                        </label>
                        <input className="" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        ui: state.ui
    }
}

const mapDispatchToProps = () => {
    return {
        // doneLoadingApp
        setUserComp
    }
}

// redux store global state so that it can be accessed from all components
// to have a page that shows the avatars associated with partiuclar desktops, 
// it has to be registered in a database / stored on the server
// basically we need to know with each update what the computer # is
// maybe this is stored in the user object as null, turned to a number
// if registered on the computer
// needs to be stored in a cookie on the computer in case the app is restarted/ refreshed
// so let's make a redux function

export default connect(mapStateToProps, mapDispatchToProps())(RegisterDesktop);

