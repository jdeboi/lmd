
import React from 'react';
import './LoadingPage.css';

export default function LoadingPage(props) {
    const sty = {fontSize: (props.ui.width < 400)?30: 50}
    return (
        <div className="backgroundCover">
            <div className="LoadingPage">
                <div className="title" style={sty}>
                    <div>losing</div>
                    <div>my</div>
                    <div>dimension</div>
                </div>
                {/* <div className="loadingSymbol">LOADING{this.getEllipses()}</div> */}
            </div>
        </div>
    )
}