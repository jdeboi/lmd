import React from 'react';
import Button from '@material-ui/core/Button';
import './BottomBar.css';
import { faEye, faRetweet, faVideo, faMicrophoneAlt, faMicrophoneAltSlash } from "@fortawesome/free-solid-svg-icons";
// import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
// import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Emojis from './Emojis';

class BottomBar extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.state = {
      emojis: [],
    }
  }

  componentDidMount() {
    this.intervalEmoji = setInterval(this.updateEmojis, 50);
  }

  componentWillUnmount() {
    clearInterval(this.intervalEmoji);
  }

  updateEmojis = () => {
    const t = new Date();
    const emojis = [...this.state.emojis];
    if (emojis.length > 0) {
      for (let i = 0; i < emojis.length; i++) {
        const emoji = { ...emojis[i] };
        emojis[i] = emoji; // is this proper immutability? I think so...?
        if (emoji) {
          emoji.y -= 12;
          if (emoji.y < 0) {
            emojis.splice(i, 1);
            i--;
          }
          else {
            emoji.x = emoji.startX + 30 * Math.sin(emoji.y / 70);
            emoji.opacity = (emoji.y - 80) / window.innerHeight;
            if (emoji.opacity < 0) emoji.opacity = 0;
            else if (emoji.opacity > 1) emoji.opacity = 1;
          }
        }
      }
      this.setState({ emojis });
      // console.log(new Date() - t, "ms");
    }
  }

  addEmoji = (id) => {
    // console.log("ADD EMOJI", id);
    const emoji = { startX: Math.random() * window.innerWidth, x: 0, y: window.innerHeight - 50, opacity: 1, id: id };
    this.setState(prevState => ({
      emojis: [...prevState.emojis, emoji]
    }))
  }


  render() {
    const emojis = this.state.emojis;
    return (
      <div>
        <div className="confession-bottomBar">
          <div className="bar-vid">
            <Button variant="contained"><FontAwesomeIcon icon={faVideo} /></Button>
            <Button variant="contained"><FontAwesomeIcon icon={faMicrophoneAlt} /></Button>
          </div>
          <div className="bar-emojis">
            <Button variant="contained" onClick={() => this.addEmoji(0)}><img src={window.AWS + "/waveforms/emojis/prayer.png"} /></Button>
            <Button variant="contained" onClick={() => this.addEmoji(1)}><img src={window.AWS + "/waveforms/emojis/communion.png"} /></Button>
            <Button variant="contained" onClick={() => this.addEmoji(2)}><img src={window.AWS + "/waveforms/emojis/praise.png"} /></Button>

            <Button variant="contained" onClick={() => this.addEmoji(3)}><img src={window.AWS + "/waveforms/emojis/open.png"} /></Button>
          </div>
          <div className="bar-good-bad">
            <Button variant="contained" ><img src={window.AWS + "/waveforms/emojis/halo.png"} /></Button>
            <Button variant="contained" ><img src={window.AWS + "/waveforms/emojis/devil.png"} /></Button>
          </div>
        </div>
        <Emojis emojis={emojis} />
      </div>
    );
  }

}



export default BottomBar;