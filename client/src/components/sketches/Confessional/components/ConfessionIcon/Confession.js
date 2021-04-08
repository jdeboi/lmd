import React from 'react';
import './Confession.css';
import { getRandom, getRandomNum } from '../../../../shared/Helpers/Helpers';
import DesktopIcon from '../../../../shared/DesktopIcon/DesktopIcon';
import TweetContent from './Tweet/TweetContent';
// import txt from '../assets/Canned/txt-ligher.png';
import { connect } from 'react-redux';

function Confession(props) {
  const { i, ui, time, confession, tweet, onDblClick, zIcon, zFrame, newFrameToTop, newIconToTop, setTweetModal } = props;
  const x = getRandomNum(i + 30) * (window.innerWidth - 100);
  const y = 15 * Math.sin(time / 400 + x / 100) + getRandomNum(i + 3) * (window.innerHeight - 200);
  const box = { x: 100 + i * 20, y: 100 + i * 20, w: 400,h: undefined };
  box.y = 15 * Math.sin(time / 400 + box.x / 100) + box.y;

  if (ui.isMobile) {
    return (
      <DesktopIcon key={i} title={"#confession"} isMobile={true} onDblClick={() => setTweetModal(tweet, confession)} x={x} y={y} zIcon={zIcon} zFrame={zFrame} box={box}
        content={
          <img src={window.AWS + "/waveforms/txt-ligher.png"} width={80} height={80} />
        }
      />
    )
  }

  return (
    <DesktopIcon key={i} title={"#confession"} onDblClick={() => onDblClick(i + 1)} newFrameToTop={() => { newFrameToTop(i) }} newIconToTop={() => { newIconToTop(i) }} x={x} y={y} zIcon={zIcon} zFrame={zFrame} box={box}
      content={
        <img src={window.AWS + "/waveforms/txt-ligher.png"} width={80} height={80} />
      }
      frameContent={
        <div className="confession-txt"><TweetContent confession={confession} tweet={tweet} /></div>
      }
    />
  )
}


const mapStateToProps = (state) => {
  return {
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    // doneLoadingApp
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Confession);

