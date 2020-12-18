import React from 'react';
import Frame from '../Frame/Frame';
import FAQ from './FAQ';
import './FAQFrame.css';

import { connect } from 'react-redux';
import {hideFaq, toggleFaq } from '../../../store/actions/';


class FAQFrame extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  onHide = () => {
    this.props.hideFaq();
  }

  render() {
    let zInd = 2500;
    const x = (window.innerWidth-this.props.w)/2;
    const y = (window.innerHeight-this.props.h-34-24)/2;
    const classN = "FAQ-Background" + (!this.props.faqIsHidden ? " GrayedOut":"");
    return (
      <div className={classN} style={{visibility: (this.props.faqIsHidden?"hidden":"visible"), zIndex : zInd}}>
        <Frame title="FAQ" isHidden={this.props.faqIsHidden} onHide={this.onHide} windowStyle={{background: "white"}} content={

            <div className="FAQFrame">

              <FAQ />
              <button className="standardButton" onClick={this.onHide}>close</button>
            </div>
          }
          width={this.props.w} height={this.props.h} x={x} y={y} z={zInd}
          />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    faqIsHidden: state.faqIsHidden
  }
}

const mapDispatchToProps = () => {
  return {
    hideFaq,
    toggleFaq
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(FAQFrame);
