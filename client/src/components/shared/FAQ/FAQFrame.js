import React from 'react';
import FAQ from './FAQ';
import CenterModal from '../CenterModal/CenterModal';

import { connect } from 'react-redux';
import { hideFaq, toggleFaq } from '../../../store/actions/menuItems';


class FAQFrame extends React.Component {

  onHide = () => {
    this.props.hideFaq();
  }

  render() {
    return (
      <CenterModal
        title="FAQ"
        isHidden={this.props.faqIsHidden}
        onHide={this.onHide}
        width={this.props.ui.width}
        height={this.props.ui.height}
        classN="FAQ"
        content={<FAQ />}
        buttons={this.getButtons()}
      />
    );
  }

  getButtons = () => {
    // return (
    //   <div className="center-buttons">
    //     <button className="standardButton primary" onClick={this.onHide}>close</button>
    //   </div>
    // )
    return null;
  }

}

const mapStateToProps = (state) => {
  return {
    faqIsHidden: state.faqIsHidden,
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    hideFaq,
    toggleFaq
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(FAQFrame);
