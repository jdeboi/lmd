import React from 'react';
import './EmojiMonitor.css';
import LikeButton from '../LikeButton/LikeButton';
import Frame from '../../../../shared/Frame/Frame';
import { mapVal } from '../../../../shared/Helpers/Helpers';
import { getDim } from './Helper';

import { connect } from 'react-redux';

class EmojiMonitor extends React.Component {

    componentDidMount() {

    }

    componentWillUnmount() {

    }



    render() {

        // const w = 200;
        // const h = 200;
        const { heartRate, maxHeart, ui, heartClicked } = this.props;
        const dim = getDim(ui);
        const { x, y, w, h, xB, yB, bW, bH, fontS, repeats, isVert } = dim;

        let emojis = this.getEmojis(repeats);

        let hr = Math.floor(heartRate);
        if (hr > 40)
            hr = Math.floor(heartRate / 5) * 5;
        let hearts = new Array(20).fill(0);
        const numHearts = Math.floor(mapVal(heartRate, 30, maxHeart, 0, hearts.length));


        return (
            <React.Fragment>
                <Frame title="" content={
                    <div className="Emoji-Monitor">
                        <div style={{ fontSize: fontS }} className={"pulse-emojis" + (isVert ? " vert" : "")}>
                            {hearts.map((h, i) => {
                                let classN = "light";
                                if (i < numHearts) {
                                    classN = "full"
                                }
                                classN += " emoji-bar";
                                return <div key={i} className={classN} style={{width: fontS, height: fontS, backgroundImage: `url(https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/clickMe/emojiBar/${ emojis[i]}.png)`}}></div>
                            })}
                        </div>
                    </div>
                }
                    width={w} height={h} x={x} y={y}
                />
                {(ui.hasFooter || ui.isMobile) ?
                    <LikeButton x={xB} y={yB} w={bW} h={bH} heartClicked={heartClicked} /> :
                    null
                }
            </React.Fragment>
        )
    }


    getEmojis = (repeats) => {
        //,"🤪",
        // let emojiList = [
        //     "❤️", "💋", "🔥", "💥", "🥵"
        // ];
        let emojiList=["heart", "kiss", "fire","explosion","hot"]
        let emojis = [];
        for (const emoji of emojiList) {
            for (let i = 0; i < repeats; i++) {
                emojis.push(emoji);
            }
        }
        return emojis;
    }
}



const mapStateToProps = (state) => {
    return {
        ui: state.ui
    }
}

const mapDispatchToProps = () => {
    return {
        // doneLoadingApp,
    }
}


export default connect(mapStateToProps, mapDispatchToProps())(EmojiMonitor);
