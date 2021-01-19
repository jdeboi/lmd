import React from 'react';
// import { Link } from 'react-router-dom';
import './Pages.css';

function Statement(props) {
    let classN = "Page " + props.ui.size;
    if (props.ui.hasFooter && props.ui.orientation === "landscape")
        classN += " landscape";
    return (
        <div className={classN}>

            <div className="Statement container">
                {/* <div className="container"> */}
                    <h1>statement</h1>
                    <p>Over the last year, Covid - 19 has dramatically altered our spatial and temporal experiences.Physical space has collapsed as we confine ourselves to our homes.Time has warped into infinite loops of monotony.And as our worlds have gotten smaller, we’ve increasingly retreated into digital worlds with their own cyber - spacetime dimensions.As we increasingly work and communicate through digital portals, questions regarding the nature of reality online face new urgency.Cyberspace affords for new explorations, connections, and communities that keep us sane in a time of isolation and physical confinement.At the same time, the internet houses vortexes of extremism, invades our privacy, and traps our attention in vapid, mindless scrolling.</p>
                    <p>Losing My Dimension seeks to characterize the nature of spacetime during quarantine.I hope that this work reveals a set of paradoxes, of space as simultaneously analog and digital, confined and liberated, multi - dimensional and flat, safe and exposed.By reflecting upon quarantine and our digital transition more broadly, I hope to inspire nuanced reflections upon the ways in which our temporal and spatial experiences are changing in these uncertain times.</p>
                {/* </div> */}
            </div>
        </div>
    );
}

export default Statement;


