import React from 'react';


class Emojis extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);
  }

  render() {
    const {emojis} = this.props;
    return (
      <div className="confession-emojis">
      {emojis?this.getEmojis():<div></div>}
      </div>
    );
  }

  getEmojis = () => {

    const {emojis} = this.props;


    return (
      emojis.map((emoji, i) => {
        const id = emoji.id;
        const imgs = ["prayer", "communion", "praise", "open", "halo"];
        const url = window.AWS + "/waveforms/emojis/" + imgs[id] + ".png" ;
        return (
          <img key={i} src={url} style={{top:`${emoji.y}px`, left:`${emoji.x}px`, opacity: emoji.opacity}} />
        )
      })
    )
  }
}



export default Emojis;
