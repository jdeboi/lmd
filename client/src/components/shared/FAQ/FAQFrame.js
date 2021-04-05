import React from 'react';
import FAQ from './FAQ';
import CenterModal from '../CenterModal/CenterModal';

import { connect } from 'react-redux';
import { setOneMenu, hideFaq, toggleFaq } from '../../../store/actions/menuItems';


class FAQFrame extends React.Component {

  onHide = () => {
    this.props.hideFaq();
    this.props.setOneMenu(null);
    console.log("testing")
  }

  render() {
    const {ui, menu} = this.props;
    let isHidden = (ui.isMobile || ui.hasFooter) ? menu.mobile !== "faq" : menu.isFaqHidden;
    return (
      <CenterModal
        title="FAQ"
        z={2501}
        isHidden={isHidden}
        onHide={this.onHide}
        isRelative={false}
        ui={this.props.ui}
        classN="FAQ"
        content={<FAQ />}
        buttons={this.getButtons()}
      />
    );
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
