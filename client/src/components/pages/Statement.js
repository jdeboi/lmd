import React from 'react';
import './Pages.css';
import { connect } from 'react-redux';
import { setNoSketchMusic } from '../../store/actions/music';


class Statement extends React.Component {

    componentDidMount() {
        this.props.setNoSketchMusic();
    }

    render() {
        const { ui } = this.props;
        let classN = "Page " + ui.size;
        if (ui.hasFooter && ui.orientation === "landscape")
            classN += " landscape";
        return (
            <div className={classN}>

                <div className="Statement container">
                    {/* <div className="container"> */}
                    <h1>statement</h1>
                    <p>Over the last year, Covid-19 has dramatically altered our spatial and temporal experiences. Physical space has collapsed as we confine ourselves to our homes. Time has warped into infinite loops of monotony. And as our worlds have gotten smaller, we’ve increasingly retreated into digital worlds with their own cyber-spacetime dimensions. As we increasingly work and communicate through digital portals, questions regarding the nature of reality online face new urgency. Cyberspace affords new explorations, connections, and communities that keep us sane in a time of isolation and physical confinement. At the same time, the internet houses vortexes of extremism, invades our privacy, and traps our attention in vapid, mindless scrolling.</p>
                    <p>Losing My Dimension seeks to characterize the nature of spacetime during quarantine. I hope that this work reveals a set of paradoxes, of space as simultaneously analog and digital, confined and liberated, multi-dimensional and flat, safe and exposed. By reflecting upon quarantine and our digital transition more broadly, I hope to inspire nuanced reflections upon the ways in which our temporal and spatial experiences are changing in these uncertain times.</p>
                    {/* </div> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = () => {
    return {
        setNoSketchMusic
    }
}


export default connect(mapStateToProps, mapDispatchToProps())(Statement);
