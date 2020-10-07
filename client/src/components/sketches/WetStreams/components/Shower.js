import React from 'react';
import Frame from '../../../shared/Frame/Frame';

class Shower extends React.Component {

  constructor(props) {
    super(props);

    // this.state = {
    //   deltaPosition: {x: 0, y: 0}
    // }
  }



  render() {
    const {isPlaying, x, y, z, w, h, id, newFrameToTop, handleDrag, onMaximized, onMinimized, onClosed} = this.props;

    let imgs = [7, 1, 3, 4, 8, 10];
    let img = imgs[id];
    let imgSrc = window.AWS+"/wetStreams/showerHeads/" + img + ".png";
    let title = "";
    if (id === 1) title = "wet streams";
    let classn = id===5?"showerhead flippedX":"showerhead";

    return (
      <Frame id={id} onDrag={(position) => handleDrag(id, position)} title={title} content={
        <div className={classn}>
        <img src={imgSrc} style={{width:w +"px", height:h+"px"}} alt="shower head" />
        </div>
      }
      width={w} height={h} x={x} y={y} onMaximized={() => onMaximized(id)} onMinimized={() => onMinimized(id)} onHide={() => onClosed(id)}  />
    )
  }
}
// z={z}
//newFrameToTop={() => {newFrameToTop(id)}}

export default Shower;
