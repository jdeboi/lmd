
import React from 'react';
import CenterModal from '../../../../shared/CenterModal/CenterModal';
import ConfessFormContent from './ConfessFormContent';


export default class ConfessMobileForm extends React.Component {
    
    // constructor(props) {
    //     super(props);
    // }


    render() {
        const { isHidden, onHide, ui } = this.props;
        return (
            <CenterModal
                title=""
                z={1000}
                isHidden={isHidden}
                onHide={onHide}
                ui={ui}
                classN="confessional-modal"
                isRelative={true}
                content={<ConfessFormContent onSubmit={null} />}
                buttons={this.getButtons()}
            />
        );
    }


    getButtons = () => {
        return (
          <div className="center-buttons">
            <button className="standardButton confess-button-secondary" onClick={this.props.onHide}>cancel</button>
            <button className="standardButton confess-button-primary" onClick={this.props.onSubmit}>submit</button>
          </div>
        )
        // return null;
    }
}