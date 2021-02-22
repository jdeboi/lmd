import React from 'react';
import './Modal.css';
import { connect } from 'react-redux';
import Frame from '../../../shared/Frame/Frame';
import CenterModal from '../../../shared/CenterModal/CenterModal';
import ReactPlayer from 'react-player';
// import { setOneMenu, hideFaq, toggleFaq } from '../../../../store/actions/menuItems';


class Modal extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            currentContent: 0,
            contentHidden: true
        }
    }

    render() {
        const { ui } = this.props;
        if (ui.isMobile || ui.hasFooter) {
            return this.getMobileModal();
        }
        return this.getDesktopModal();
    }

    getDesktopModal = () => {
        const { onHide, isHidden, ui } = this.props;
        const w = ui.width - 40;
        const h = ui.contentH - 40;
        return (
            <Frame title=""
                bounded={true}
                isHidden={isHidden}
                onHide={onHide}
                className="home-page-modal"
                windowStyle={{ background: "rgba(0, 0, 0, .9)" }}
                content={this.getModalContentPortrait()}
                width={300}
                height={this.getModalFrameH()}
                x={20}
                y={20}
                z={1000}
            />
        );
    }

    getMobileModal = () => {
        const { ui, isHidden, onHide } = this.props;
        let h = ui.contentH;
        let w = ui.contentW;
        const content = ui.orientation === "portrait" ? this.getModalContentPortrait() : this.getModalContentLandscape();
        return (
            <CenterModal
                title=""
                isHidden={isHidden}
                onHide={onHide}
                ui={ui}
                classN="home-modal"
                content={content}
                isRelative={true}
                buttons={this.getButtons()}
                z={1000}
            />
        )
    }

    getModalFrameH = () => {
        const {ui} = this.props;
        const fullH = ui.contentH - ui.toolbarH - 2*ui.edgeSpacing ;
        return Math.min(fullH, 800);
    }

    getModalContentLandscape = (w, h) => {
        return null;
    }

    getModalContentPortrait = () => {
        const { ui, data } = this.props;
        let fH = this.getModalFrameH();
        let imgH = 300;
        let imgW = 300;
        let txtH = fH - imgH;

        let classN = "loc-content";
        if (ui.hasFooter || ui.isMobile) {
            classN += " mobile";
            imgH = 200;
            if (ui.orientation === "landscape")
                classN += " landscape"
        }

        const imgStyle = {
            backgroundImage: `url(${window.AWS}/homePage/thumbnails/${data.img}.jpg)`,
            height: imgH,
            width: imgW
        }

        let stars = "";
        for (let i = 0; i < Math.round(data.stars); i++) {
            stars += "*";
        }

        return (
            <div className={classN} style={{height: fH}}>
                {/* <div className="loc-img" style={imgStyle} /> */}
                <ReactPlayer
                    className={"react-player loc-vid"}
                    playing
                    muted
                    loop
                    width={imgH}
                    height={imgW}
                    playsInline
                    url={`${window.AWS}/homePage/vids/${data.img}.mp4`}
                />
                <div className="loc-container" style={{ height: txtH, width: imgW }}>
                    <div className="loc-txt">
                        <div className="loc-title">{data.name}</div>
                        <div className="loc-stars">{data.stars + " " + stars}</div>
                        <div className="loc-description">{data.description}</div>
                    </div>
                </div>
            </div>
        )
    }

    getButtons = () => {
        const {onHide} = this.props;
        return (
            <div className="center-buttons">
                <button className="standardButton primary" onClick={onHide}>close</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ui: state.ui,
    }
}

const mapDispatchToProps = () => {
    return {
    }
}


export default connect(mapStateToProps, mapDispatchToProps())(Modal);
