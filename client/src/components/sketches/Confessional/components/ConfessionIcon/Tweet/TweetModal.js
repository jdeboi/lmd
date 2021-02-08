
import React from 'react';
import CenterModal from '../../../../../shared/CenterModal/CenterModal';
import TweetContent from './TweetContent';
import './TweetModal.css';

export default class TweetModal extends React.Component {
    
    constructor(props) {
        super(props);
    }


    render() {
        const { isHidden, onHide, ui, confession, tweet } = this.props;
        
        return (
            <CenterModal
                title=""
                z={1000}
                isHidden={isHidden}
                onHide={onHide}
                ui={ui}
                classN="tweet-modal"
                isRelative={true}
                content={<TweetContent confession={confession} tweet={tweet} />}
                buttons={this.getButtons()}
            />
        );
    }


    getButtons = () => {
        return (
          <div className="center-buttons">
            <button className="standardButton confess-button-primary" onClick={this.props.onHide}>close</button>
          </div>
        )
        // return null;
    }
}