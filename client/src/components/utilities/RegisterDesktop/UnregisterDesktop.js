import React from 'react';
import './RegisterDesktop.css';
import { connect } from 'react-redux';
import { removeUserComp } from '../../../store/actions/user';

// import { Link } from 'react-router-dom';

class UnregisterDesktop extends React.Component {
    


    handleSubmit = (event) => {
        this.props.removeUserComp();
        alert("unregistered");
        event.preventDefault();

    }

    render() {
        return (
            <div className="Desktop-Register Sketch">
                <div className="container">
                    <button className="secondary standardButton" onClick={this.handleSubmit}>unregister</button>
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
        removeUserComp
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

export default connect(mapStateToProps, mapDispatchToProps())(UnregisterDesktop);

