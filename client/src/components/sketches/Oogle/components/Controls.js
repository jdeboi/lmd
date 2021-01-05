

import React from 'react';
import Frame from '../../../shared/Frame/Frame';

function Controls(props) {

    return (
        <Frame title=""
            bounded={true}
            isHidden={props.isHidden}
            onHide={props.onHide}
            className="house-controls"
            windowStyle={{ background: "rgba(0, 0, 0, .9)" }}
            content={
               <div>
                 
               </div> 
            }
            width={300}
            height={50}
            x={200}
            y={20}
            z={1000}
        />
    )
}