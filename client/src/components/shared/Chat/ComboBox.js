/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';


import { connect } from 'react-redux';
import { resetMessgeNotification } from '../../../store/actions/messages';



class ComboBox extends React.Component {

  // really I only think this needs to rerender if someone joins/leaves a ROOM
  // or registers/ connects / disconnects

  constructor(props) {
    super(props);

    this.state = {
      // value: null,
      inputValue: "",
    }


    this.initialUsers = [{userName: "Everyone", avatar: "👥"}, {userName: "Room", avatar: "🚪"}];

    // if (this.props.room === "home") {
    //   const wineBot = {};
    //   const hostBot = {};
    //   this.initialUsers.push(wineBot);
    //   this.initialUsers.push(hostBot);
    // }🤖



  }

  componentDidUpdate(prevProps) {
    // console.log("setting new chat user", this.props.userActiveChat);
    if (prevProps.userActiveChat !== this.props.userActiveChat) {
      // this.updateAndNotify();
      var label = "";
      if (this.props.userActiveChat) label = this.getLabel(this.props.userActiveChat);
      this.setState({inputValue: label});
      // this.setValue(this.props.userActiveChat);
    }
  }

  getInitialUserNames = () => {
    const names = [];
    for (const user of this.initialUsers) {
      names.push(user.userName);
    }
    return names;
  }

  getLabel(user) {
    if (!user) return "";
    return `${user.avatar} ${user.userName}`;
  }

  // CHANGES WHEN TYPING INPUT
  setInputValue = (newInputValue) => {
    if (newInputValue) {
      this.setState({inputValue: newInputValue});
    }
    else {
      this.setState({inputValue: ""});
    }
  }

  getUserListInRoom = () => {
    var users = this.getInitialUserNames();
    if (this.props.users) {
      for (let i = 0; i < this.props.users.length; i++) {
        const user = {...this.props.users[i]};
        // don't include winebot with id = 1
        if (user.room === this.props.room && user.id !== 1) {
          users.push(this.getLabel(user));
        }
      }
    }
    return users;
  }

  getUsersInRoomTrunc = () => {
    var users = this.initialUsers;
    if (this.props.users) {
      for (let i = 0; i < this.props.users.length; i++) {
        const user = {...this.props.users[i]};
        if (user.room === this.props.room && user.id !== 1) {
          users.push({avatar: user.avatar, userName: user.userName});
        }
      }
    }
    return users;
  }

  getUsersInRoom = () => {
    // console.log("USERS", users)
    var users = this.initialUsers;
    if (this.props.users) users = [...users, ...this.props.users];
    let usersInRoom = users.filter((user, i) => {
      return (i < 10) || (user.room === this.props.room && user.id);
    })
    // console.log("ROOM USERS", usersInRoom)
    return usersInRoom;
  }

  getUserObjectByListID(listID) {
    var users = this.initialUsers;
    if (this.props.users) users = [...users, ...this.props.users];
    let obj = users.find(user => listID === this.getLabel(user));
    return obj;
  }

  // CHANGES WHEN HIT RETURN, CLICK,
  // I.E. SELECTED FROM LIST
  setValue = (newValue) => {
    // this.setState({value: newValue});

    this.props.setRecipient(newValue);
  }

  render() {
    // const userList = this.getUserListInRoom();
    const users = this.getUsersInRoom();

    const {inputValue} = this.state;
    const {userActiveChat, userHoverChat} = this.props;

    let sty = {};
    if (this.props.w) {
      sty.width = this.props.w-10;
    }
    console.log(sty);

    return (
      
      <div className="AutoComplete">
        <Autocomplete
          id="combo-box-demo"
          className="autocomplete"
          value={userActiveChat}
          onChange={(event, newValue) => {
            this.setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            this.setInputValue(newInputValue);
          }}
          onFocus={this.props.resetMessgeNotification}
          options={users}
          getOptionLabel={(option) => this.getLabel(option)}
          getOptionSelected={(option, value) => this.getLabel(option) === this.getLabel(value)}
          fullWidth
          renderInput={(params) => {
            // console.log("PARAMS", params);
            return (
              <div ref={params.InputProps.ref} >
                <input className="autocomplete-input" style={sty} type="text" placeholder="select user" {...params.inputProps} />
              </div>
            )
          }}
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = () => {
  return {
    resetMessgeNotification
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(ComboBox);
