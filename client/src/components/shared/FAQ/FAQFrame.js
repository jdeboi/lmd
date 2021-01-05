import React from 'react';
import FAQ from './FAQ';
import CenterModal from '../CenterModal/CenterModal';

import { connect } from 'react-redux';
import { setOneMenu, hideFaq, toggleFaq } from '../../../store/actions/menuItems';


class FAQFrame extends React.Component {

  onHide = () => {
    this.props.hideFaq();
    this.props.setOneMenu(null);
  }

  render() {
    const {ui} = this.props;
    let isHidden = (ui.isMobile || ui.hasFooter) ? this.props.menu !== "faq" : this.props.faqIsHidden;
    return (
      <CenterModal
        title="FAQ"
        z={1000}
        isHidden={isHidden}
        onHide={this.onHide}
        ui={this.props.ui}
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
    ui: state.ui,
    menu: state.menu
  }
}

const mapDispatchToProps = () => {
  return {
    hideFaq,
    toggleFaq,
    setOneMenu
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(FAQFrame);
