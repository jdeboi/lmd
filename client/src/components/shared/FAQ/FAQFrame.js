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

    return (
      <div className="FAQ-Background" style={{visibility: (this.props.faqIsHidden?"hidden":"visible")}}>
        <Frame title="FAQ" isHidden={this.props.faqIsHidden} onHide={this.onHide} windowStyle={{background: "white"}} content={

            <div className="FAQFrame">

              <FAQ />
            </div>
          }
          width={400} height={300} x={400} y={200} z={1000}
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
