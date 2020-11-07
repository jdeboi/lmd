import React from 'react';
import './Instructions.css';
import FAQ from '../../FAQ/FAQ';

export default function Instructions (props) {
  return (
    <div className="Instructions">
      <div></div>
      <FAQ />
      <div className="welcome-buttons">
        <button className="standardButton" onClick={props.prevStep}>back</button>
        <button className="standardButton highlightButton" onClick={props.closeWelcome}>finish</button>
      </div>
    </div>
  )
}
