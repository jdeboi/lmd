import React from 'react';
import './Modal.css';
import { connect } from 'react-redux';
import Frame from '../../../shared/Frame/Frame';
import CenterModal from '../../../shared/CenterModal/CenterModal';
// import { setOneMenu, hideFaq, toggleFaq } from '../../../../store/actions/menuItems';


class Modal extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            currentContent: 0,
            contentVisible: false
        }
    }

    render() {
        const {ui} = this.props;
       if (ui.isMobile || ui.hasFooter) {
           return this.getMobileModal();
       }
       return this.getDesktopModal();
    }

    getDesktopModal = () => {
        const { onHide, isHidden } = this.props;
        let h = this.getMobileFrameH() - 300;
        let w = 300;
        return (
            <Frame title=""
                bounded={true}
                isHidden={isHidden}
                onHide={onHide}
                className="home-page-modal"
                windowStyle={{ background: "rgba(0, 0, 0, .9)" }}
                content={this.getModalContentPortrait(w, h)}
                width={300}
                height={this.getMobileFrameH()}
                x={20}
                y={20}
                z={1000}
            />
        );
    }

    getMobileModal = () => {
        const { ui } = this.props;
        const w = ui.width - 40;
        const h = ui.contentH - 40;
        const content = ui.orientation === "portrait"? this.getModalContentPortrait(w, h): this.getModalContentLandscape();
        return (
            <CenterModal
                title=""
                isHidden={false}
                onHide={this.onHide}
                ui={this.props.ui}
                classN="home-modal"
                content={content}
                buttons={this.getButtons()}
                z={1000}
            />
        )
    }

    getMobileFrameH = () => {
        return this.props.ui.contentH - 40 - this.props.ui.toolbarH;
    }

    getModalContentLandscape = (w, h) => {
        return null;
    }

    getModalContentPortrait = (w, h) => {
        const { ui, data } = this.props;
        let imgH = 300;
        let imgW = 300;
        let txtH = h - 250;

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
        

        return (
            <div className={classN}>
                <div className="loc-img" style={imgStyle} />
                <div className="loc-container" style={{ height: txtH, width: w }}>
                    <div className="loc-txt">
                        <div className="loc-title">{data.name}</div>
                        <div className="loc-stars">4.5 ****</div>
                        <div className="loc-description">{data.description}</div>
                    </div>
                </div>
            </div>
        )
    }

    getButtons = () => {
        return (
            <div className="center-buttons">
                <button className="standardButton primary" onClick={this.onHide}>close</button>
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
