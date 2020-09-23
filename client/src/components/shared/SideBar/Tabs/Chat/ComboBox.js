/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


import socket from "../../../Socket/Socket";

class ComboBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: null,
      inputValue: ""
    }

    this.firstUser = {userName: "Everyone", avatar:""};

    this.setValue = this.setValue.bind(this);
    this.setInputValue = this.setInputValue.bind(this);

    this.sendToOne = this.sendToOne.bind(this);
    this.sendToAll = this.sendToAll.bind(this);
    this.sendToRoom = this.sendToRoom.bind(this);
  }

  // shouldComponentUpdate(nextProps) {
  //   const change = nextProps.usersChange || this.props.usersChange;
  //   console.log(change, nextProps.usersChange, this.props.usersChange);
  //   return change;
  // }

  sendToOne(txt, socketId) {
    console.log("send to one")
    const message = {socketId: socketId, message: txt};
    if (socket.connected) socket.emit('messageUser', message); //sending to individual socketid
  }

  sendToRoom(txt, room) {
    console.log("send to room ", room)
    const message = {room: room, message: txt};
    if (socket.connected) socket.emit('messageRoom', message);
  }

  sendToAll(txt) {
    console.log("send to all");
    const message = {message: txt};
    if (socket.connected) socket.emit('messageAll', message);
  }

  setValue(newValue) {
    this.setState({value: newValue});
  }

  setInputValue(newInputValue) {
    // console.log("changing that user"+newInputValue+"0");
    this.setState({inputValue: newInputValue});
    const str = this.firstUser.avatar + " " + this.firstUser.userName;
    if (newInputValue === str) {
      this.sendToAll("hey y'all");
    }
    else {
      this.sendToOne("wuts up", newInputValue.id);
    }
  }

  render() {
    // console.log("USERS", this.props.users);
    const {users} = this.props;
    // console.log(users);
    if (users && users[0] && users[0].userName != this.firstUser.userName) users.unshift(this.firstUser)

    const {value, inputValue} = this.state;

    return (
      <Autocomplete
      id="combo-box-demo"
      value={value}
      onChange={(event, newValue) => {
        this.setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        this.setInputValue(newInputValue);
      }}
      options={users}
      getOptionLabel={(option) => option.avatar + " " + option.userName}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="select user" variant="outlined" />}
      />
    );
  }
}

export default ComboBox;
