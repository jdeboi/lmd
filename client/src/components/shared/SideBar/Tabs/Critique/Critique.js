import React from 'react';

import './Critique.css';

import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

import socket from "../../../Socket/Socket";

class Critique extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isPublic: true,
      textBox: "",
      buttonDisabled: true,
      critiques: [],
      checked: true
    }
  }

  componentDidMount() {
    this.fetchRoomCritiques();

    socket.on("critique", data => {
      // console.log("CRIT ADDDED", this.state.critiques, data);
      const critiques = [...this.state.critiques, data];
      this.setState({critiques});
      // socket.emit("leaveRoom", user.room); // not sure if we need this?

    })
  }

  async fetchRoomCritiques() {
    // const query = encodeURI("\#confession");
    // console.log("WERERE", query);
    // console.log("FETCHING FROM", this.props.room);
    const url = `/api/get/critiques/${this.props.room}`;
    const response = await fetch(url);
    const initialRes = await response.json();

    if (initialRes) {
      // console.log("crits", initialRes);
      const critiques = [...this.state.critiques, ...initialRes];
      this.setState({critiques});
    }
    else {
      console.log("NO crits");
    }
  }

  getPublicRoomCritiques = () => {
    const crits = this.state.critiques;
    const roomCrits = crits.filter(crit => crit.room === this.props.room && crit.public);
    return roomCrits;
  }

  handleCheckClick = () => {
    this.setState(prevState => ({
      checked: !prevState.checked
    }));
  }

  handleTextBoxChange = (event) => {
    const textBox = event.target.value;
    this.setState({textBox, buttonDisabled: textBox===""});
  };

  onSubmit = () => {
    if (this.state.textBox === "") {
      alert ("please enter a crit");
    }
    else {
      // Simple POST request with a JSON body using fetch
      const crit = { from: this.props.user.userName, room: this.props.room, crit:this.state.textBox, public: this.state.isPublic, time: new Date() };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(crit)
      };
      fetch("/api/post/critique", requestOptions)
      .then(response => response.json())
      .then(data => {
        // console.log("RESONSE", data);
        // this.sendCritique(data)
        this.setState({textBox: ""})
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }


  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  render() {
    const crits = this.getPublicRoomCritiques().reverse();
    return (
      <div className="Critique Panel">
        <div className="Critique-Box">
          <div className="Critique-title">
            <div className="Panel-title">submit crit</div>
            <div className="checkbox">
              <input type="checkbox" id="public" name="public" checked={this.state.checked} onChange={this.handleCheckClick} />
              <label htmlFor="public">Public</label>
            </div>
          </div>
          <div className="Critique-text">
            <div className="Critique-text-inner blueOutline">
              <textarea
                label=""
                className={"form-item"}
                placeholder="enter a critique"
                value={this.state.textBox}
                onChange={this.handleTextBoxChange}
                />
            </div>
          </div>
          <button className="" id="critButton" disabled={this.state.buttonDisabled} onClick={this.onSubmit}><SendIcon disabled={this.state.buttonDisabled} /></button>
        </div>
        <div className="Critiques">
          <div className="Panel-title">public critiques</div>
          <div className="crits">
            {crits.slice(0, 5).map((crit, i) => {
              let opac = 1-(i/4);
              opac = Math.max(opac, 0);
              return (
                <div key={i} className="crit">
                  <div className="crit-inner" style={{opacity: opac}}>
                    <div>from: {crit.from}</div>
                    <div>{crit.crit}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }

}

export default Critique;
