import React from 'react';
// import Frame from '../../../shared/Frame/Frame';
import * as d3 from 'd3';
import {labels, points} from './data';
import './Oogle.css';

import {find_angle, getPointByID, getPointByName, objectEmpty, dist} from './Helpers';



class Oogle extends React.Component {

  // static propTypes = {...}

  componentDidMount() {
    var isMobile = false;
    var dudeIsClicked = false;
    let currentAngle = 0;
    let startDragMouse = {};

    d3.xml(window.AWS + '/oogle/assets/layout.svg')
    .then(data => {
      d3.select("#mapContainer").node().append(data.documentElement);
      mapLoaded();
    })

    function mapLoaded() {
      const labels = [
        {txt: "front porch", sc: 1},
        {txt: "foyer", sc: 1},
        {txt: "living room", sc: 1},
        {txt: "hall",sc: 1},
        {txt: "bathroom", sc: 1},
        {txt: "bedroom", sc: 1},
        {txt: "bedroom guest",  sc: 1},
        {txt: "bathroom guest",  sc: 1},
        {txt: "kitchen",  sc: 1},
        {txt: "back porch", sc: 1},

        // foyer
        {txt: "Foster Wallace books (for looks)", x:240, y:250, sc: 2},
        {txt: "house plant that I overwatered", x:355, y:90, sc: 2},
        {txt: "past-due Amazon return",x:220, y:200,  sc: 3},
        {txt: "forgotten lunch tupperware", x:380, y:220, sc: 3},
        {txt: "decorative jar stolen (taken?) from bougie hotel", x:350, y:280, sc: 4},
        {txt: "$27,256 in student loan bills", x:220, y:50, sc: 4},


        // bedroom
        {txt: "lukewarm peppermint tea", x:210, y:500, sc: 2},
        {txt: "favorite earring lost behind dresser", x:220, y:360, sc: 2},
        {txt: "love letters from exes", x:300, y:330, sc: 3},
        {txt: "(free) cherry flavored condoms", x:380, y:520, sc: 3},
        {txt: "period blood-stained undies", x:350, y:550, sc: 4},
        {txt: "mania meds", x:200, y:400, sc: 4},
        {txt: "valuables box: birth certificate, social, passport", x:380, y:470, sc: 4},

        // bathroom
        {txt: "termite dust...", x:580, y:500, sc: 2},
        {txt: "rat-sized drain hairball", x:580, y:530, sc: 3},
        {txt: "15-year-expired laxatives", x:580, y:410, sc: 4},

        // bathroom 2
        {txt: "fungus amungus", x:1140, y:470, sc: 2},
        {txt: "shower blowie", x:1160, y:550, sc: 3},

        // hall
        {txt: "unplugged fire alarm", x:695, y:365, sc: 2},

        // back porch
        {txt: "fat cat sightings", x:1270, y:330, sc: 2},
        {txt: "spliff butts", x:1255, y:400, sc: 4},

        // front porch
        {txt: "3 Amazon packages worth of glitter", x:50, y:340, sc: 2},
        {txt: "not so secret key", x:55, y:500, sc: 3},

        // kitchen
        {txt: "ramen for days", x:950, y:260, sc: 2},
        {txt: "hot glue-able Mardi Gras bedazzlers", x:1080, y:80, sc: 2},
        {txt: "multiple dead cockroaches", x:900, y:150, sc: 3},
        {txt: "pantry moth infestation", x:1000, y:220, sc: 3},
        {txt: "very gassy gumbo", x:1080, y:260, sc: 4},
        {txt: "box full of green", x:1080, y:140, sc: 4},

        // living
        {txt: "color-coordinated textbooks", x:700, y:250, sc: 2},
        {txt: "side-of-the-road chair", x:590, y:50, sc: 2},
        {txt: "plastic World Market succulent", x:700, y:190, sc: 3},
        {txt: "Alexa, listening...", x:740, y:100, sc: 3},
        {txt: "afternoon delight", x:740, y:170, sc: 4},
        {txt: "unused ADT alarm", x:550, y:270, sc: 4},

        // 2nd bedroom
        {txt: "$4.34 in (scattered) change", x:900, y:460, sc: 2},
        {txt: "aspirational jeans", x:790, y:550, sc: 2},
        {txt: "70s porn mags from creepy uncle", x:940, y:340, sc: 3},

        {txt: "8 weeks of laundry", x:840, y:500, sc: 3},
        {txt: "magic mushrooms", x:840, y:420, sc: 4},
        {txt: "", x:920, y:550, sc: 4},


      ];
      const points = [
        {"id":"porch1", "name": "Front Porch", "icon": "porch", "x": 40, "y":298, "on": false, "connected": ["Foyer"]},
        {"id":"foyer", "name": "Foyer", "icon": "foyer", "x": 303.5, "y":162, "on": false, "connected": ["Front Porch", "Living Room"]},
        {"id":"living", "name": "Living Room", "icon": "living", "x": 595, "y":162, "on": false, "connected": ["Foyer", "Hall", "Kitchen"]},
        {"id":"hall", "name": "Hall", "icon": "hall", "x": 595, "y":350, "on": false, "connected": ["Bedroom", "Bathroom", "Bathroom Guest", "Bedroom Guest"]},
        {"id":"bathroom1", "name": "Bathroom", "icon":"bathroom", "x": 595, "y":470, "on": false, "connected": ["Hall"]},
        {"id":"bedroom1", "name": "Bedroom", "icon":"bedroom", "x": 293, "y":452, "on": false, "connected": ["Hall"]},
        {"id":"bedroom2", "name": "Bedroom Guest", "icon":"bedroom", "x": 1009, "y":408, "on": false, "connected": ["Hall", "Bathroom Guest"]},
        {"id":"bathroom2", "name": "Bathroom Guest", "icon":"bathroom", "x": 1115, "y":532, "on": false, "connected": ["Bedroom Guest"]},
        {"id":"kitchen", "name": "Kitchen", "icon":"kitchen", "x": 1008, "y":183, "on": false, "connected": ["Living Room", "Back Porch"]},
        {"id":"porch2", "name": "Back Porch", "icon": "porch", "x": 1257, "y":293, "on": false, "connected": ["Kitchen"]}
      ];
      for (let i = 0; i < 10; i ++) {
        labels[i].x = points[i].x;
        labels[i].y = points[i].y+3;
      }

      let containerWidth = +d3.select("#mapContainer"+(isMobile?"Mobile":"")).style('width').slice(0, -2)
      let containerHeight = +d3.select("#mapContainer"+(isMobile?"Mobile":"")).style('height').slice(0, -2)

      let mapAngle = 0;
      let zoomLevel = 1;
      let iconS = 30;
      if (isMobile) iconS = 70;
      let mouseCoords = [];
      let streetOver = false;
      let directionsSet = false;
      let showDirections = false;

      let startLocSelected = false;
      let endLocSelected = false;

      let globalDirections = {};


      let domID = "";

      let zoom = d3.zoom()
      .scaleExtent([.7, 3.2])
      .on("zoom", zoomed);

      // console.log(containerHeight);
      // if (isMobile) setTransform(70, -300, .92, 0);
      // else setTransform(70, 0, .92, 0);

      let svg = d3.select("#mapContainer"+(isMobile?"Mobile":"") + " svg");
      svg.call(zoom);




      svg.on("mousemove", function(event){
        mouseCoords = d3.pointer(event);
        if (dudeIsClicked) {
          d3.select("g#dudeImg").attr("class", "visible")
          .attr("pointer-events", "none");
          dudeImg.attr("x", mouseCoords[0]-25);
          dudeImg.attr("y", mouseCoords[1]-45);
        }
      });

      let mapGroup = svg.select("g#map")



      /////////////////////////////////////////////
      // ICONS
      let iconsGroup = svg.append('g')
      .attr("id", "icons");
      // .attr("pointer-events", "none");

      iconsGroup
      .selectAll('.icon')
      .data(points)
      .enter()
      .append('image')
      .attr("xlink:href", (d) => window.AWS + "/oogle/assets/icons/" + d.icon + ".svg" )
      .attr("x", (d) => d.x-iconS/2)
      .attr("y", (d) => d.y-iconS)
      .attr("width", iconS)
      .attr("height", iconS)
      .on("mouseover", function(d) {
        d.on = true;
        if (dudeIsClicked) {
          highlightedDudePaths();
        }
      })
      .on("mouseout", function(d) {
        d.on = false;
        resetYellowPaths();
      });

      function onIcon() {
        let on = false;
        iconsGroup
        .selectAll('image')
        .each(function(d) {
          if (d.on) on = true;
        });
        return on;
      }


      /////////////////////////////////////////////
      // LABELS
      let wordsGroup = svg.append('g')
      .attr("id", "words")
      .attr("pointer-events", "none");

      wordsGroup
      .selectAll('.word')
      .data(labels)
      .enter()
      .append('text')
      .attr("class", (d, i) => 'word'+i)
      .attr("class", (d) => {
        if (zoomLevel < 1) {
          if (d.sc > 1) return "visible";
          return "hidden"
        }
        else {
          if (d.sc == 1) return "visible";
          return "hidden";
        }
      })
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y+20)
      .attr("dy", 0)
      .text((d) => {
        if (d.sc == 1) return d.txt.toUpperCase();
        return d.txt;
      })
      .attr("font-family", (d) => {
        return "Roboto";
      })
      .attr("letter-spacing", (d) => {
        if (d.sc == 1) return ".2rem";
        return "normal"
      })
      .attr("font-size", (d) => {
        let startVal = 14;
        if (isMobile) startVal = 28;
        if (d.sc == 1) return startVal + 4 + "px";
        // else if (d.sc == 2) return "18px";
        return startVal + "px";
      })
      .attr("fill", "gray")
      .style("text-anchor", "middle")
      .style("text-align", "center")
      .call(wrap, 200); // wrap the text in <= 30 pixels

      wordsGroup
      .selectAll("text")
      .each(function(d, i) {
        let bound = d3.select(this).node().getBBox();
        let w = bound.width/2;
        let h = bound.height/2;
        labels[i].bw = w;
        labels[i].bh = h;
      })

      wordsGroup
      .selectAll("text")
      .data(labels)
      .enter();

      function wrap(text, width) {
        text.each(function () {
          let text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          x = text.attr("x"),
          y = text.attr("y"),
          dy = 0, //parseFloat(text.attr("dy")),
          tspan = text.text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", dy + "em");
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan")
              .attr("x", x)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
            }
          }
        });
      }

      /////////////////////////////////////////////
      // STREETVIEW

      let defs = svg.append("defs").attr("id", "imgdefs")
      let dudePattern = defs.append("pattern")
      .attr("id", "dudePattern")
      .attr("height", 1)
      .attr("width", 1)
      .attr("x", "0")
      .attr("y", "0")
      .append("image")
      .attr("xlink:href", window.AWS + "/oogle/assets/dude.png")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 56)
      .attr("height", 240);

      let dudeImg = svg.append("g")
      .attr("id", "dudeImg")
      .attr("class", "hidden")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 60)
      .attr("height", 60)
      .attr("fill", "url(#dudePattern)")

      function resetYellowPaths() {
        d3.selectAll("g#paths polygon")
        .style('fill', d3.rgb(254,241,160))
        .style('stroke', d3.rgb(243, 201, 89))
        .style('stroke-width', 3);
        if (directionsSet) {
          displayRoutes(globalDirections.steps);
        }
      }

      function highlightedDudePaths() {
        d3.selectAll("g#paths polygon")
        .style('fill', d3.rgb(151,221,251))
        .style('stroke-width', 0);

        // darker b = d3.rgb(151,221,251)
        // light b = d3.rgb(70, 143, 170)

        if (directionsSet) {
          displayRoutes(globalDirections.steps);
        }
      }


      let onRoute = false;
      let routes = d3.select("g#paths").selectAll("polygon");
      routes
      .attr("pointer-events", "all")
      .on("mouseover", function(d) {
        onRoute = true;
        if (dudeIsClicked) {
          highlightedDudePaths();
        }
      })
      .on("mouseout", function(d) {
        onRoute = false;
        resetYellowPaths();
      });

      d3.select("#dude")
      .on('mouseover', function(d){
        d3.select(this).style("background-position", "-4px -189px")
      })
      .on('mouseout', function(d){
        let dude = d3.select(this);
        console.log(dudeIsClicked);
        if (dudeIsClicked) dude.style("background-position", "-4px 400px");
        else dude.style("background-position", "-4px -9px");
      })

      document.onmouseup = release;


      function release() {
        dudeIsClicked = false;

        let d = d3.select("g#dudeImg").attr("class", "hidden");



        d3.select("#dude").style("background-position", "-4px -9px");

        if (onRoute || onIcon()) {

          getNearestPoint();
        }
      }

      function getNearestPoint() {

        let ind = -1;
        let dis = Infinity;
        iconsGroup.selectAll("image")
        .each(function(d, i) {
          // console.log(m)
          let dd = dist(mouseCoords[0], mouseCoords[1], points[i].x, points[i].y);
          if (dd < dis) {
            dis = dd;
            ind = i;
          }
        });

        // window.location.href = webURL + "houseview/?room=" + points[ind].id;
      }



      d3.select('button#zoomIn').on('click', function() {
        zoom.scaleBy(svg.transition().duration(750), 1.3);
      });

      d3.select('button#zoomOut').on('click', function() {
        zoom.scaleBy(svg.transition().duration(750), 1 / 1.3);
      });

      /////////////////////////////////////////////
      // ZOOM
      function initState(mapAngle) {
        zoomLevel = 1;
        mapGroup.attr("transform", getMapRotate(mapAngle));
        wordsGroup.attr("transform", getMapRotate(mapAngle));
        iconsGroup.attr("transform", getMapRotate(mapAngle));

        let dx = 0;
        let dy = 0;

        iconsGroup
        .selectAll('image')
        .attr("transform", (d) => {
          let offsetX = d.x;
          let offsetY = d.y;
          let t = "translate("+offsetX+ ","+offsetY+") ";
          t += "rotate(" + (-mapAngle) + ", 0, 0)"
          t += "scale("+ (1/zoomLevel) + ") ";
          t += "translate(-"+offsetX+",-"+offsetY+ ") " ;

          return t;
        });

        wordsGroup
        .selectAll('text')
        .attr("transform", (d, i) => {
          let offsetX = d.x;
          let offsetY = d.y;
          // console.log(d.txt, d.bw)
          let t = "translate("+offsetX+ ","+offsetY+") ";
          t += "rotate(" + (-mapAngle) + ", 0, 0)"
          t += "scale("+ (1/zoomLevel) + ") ";
          t += "translate(-"+offsetX+",-"+offsetY+ ")";
          return t;
        });
      }

      //https://observablehq.com/@d3/d3v6-migration-guide
      function zoomed(event) {
        setTransform(event.transform.x, event.transform.y, event.transform.k, mapAngle);
      }


      function setTransform(x, y, k, angle) {
        let transform = `translate(${x}, ${y}) scale(${k})`;

        // satellite.attr("transform", transform + " " + getMapRotate(angle));
        mapGroup.attr("transform", transform + " " + getMapRotate(angle));
        wordsGroup.attr("transform", transform + " " + getMapRotate(angle));
        iconsGroup.attr("transform", transform + " " + getMapRotate(angle));

        zoomLevel = k;
        let dx = x;
        let dy = y;

        iconsGroup
        .selectAll('image')
        .attr("transform", (d) => {
          let offsetX = d.x;
          let offsetY = d.y;
          let t = "translate("+offsetX+ ","+offsetY+") ";
          t += "rotate(" + (-mapAngle) + ", 0, 0)"
          t += "scale("+ (1/zoomLevel) + ") ";
          t += "translate(-"+offsetX+",-"+offsetY+ ") " ;

          return t;
        });

        wordsGroup
        .selectAll('text')
        .attr("transform", (d, i) => {
          let offsetX = d.x;
          let offsetY = d.y;
          // console.log(d.txt, d.bw)
          let t = "translate("+offsetX+ ","+offsetY+") ";
          t += "rotate(" + (-mapAngle) + ", 0, 0)"
          t += "scale("+ (1/zoomLevel) + ") ";
          t += "translate(-"+offsetX+",-"+offsetY+ ")";
          return t;
        })
        .attr("class", (d) => {
          // zoom goes up as zooms in
          if (zoomLevel > 2) {
            if (d.sc > 1) return "visible";
            return "hidden"
          }
          else if (zoomLevel > 1.5) {
            if (d.sc > 1 && d.sc < 4) return "visible";
            return "hidden"
          }
          else if (zoomLevel > 1) {
            if (d.sc < 3) return "visible";
            return "hidden"
          }
          else {
            if (d.sc == 1) return "visible";
            return "hidden";
          }
        });

        changeLegend();
      }

      function changeLegend() {
        //
        // width of house = 50 ft
        // width of screen = 1650 pixels
        // width bar = 100 pixels
        //  100 * (1/zoomLevel) * (50/1650) = 3 ft @ zoomlevel 1
        let newLen = 1/zoomLevel * 3;
        let fivesLen =  Math.round(newLen *10 / 5) * 5 /10;
        let newBar = fivesLen * (1650/50) * zoomLevel;
        d3.select(".legendNum").html(fivesLen + "ft")
        d3.select(".legendBar").style("width", newBar +"px")
      }


      /////////////////////////////////////////////
      // ROTATION
      function dragstarted(event) {
        startDragMouse = d3.pointer(event);
        // console.log(startDragMouse)
      }

      function dragged(event) {
        let dtheta = getDTheta(event, this);
        rotateMap(currentAngle + dtheta);
        rotateIcons(currentAngle + dtheta);
      }

      function dragended(event) {
        currentAngle += getDTheta(event, this);
        rotateMap(currentAngle);
        rotateIcons(currentAngle);
      }

      function getDTheta(event, inst) {
        let d0 = [containerWidth/2, containerHeight/2];
        let d1 = startDragMouse;
        let thetaStart = Math.atan2(d1[1] - d0[1], d1[0] - d0[0]);
        d1 = d3.pointer(event);
        let thetaEnd = Math.atan2(d1[1] - d0[1], d1[0] - d0[0]);
        let dTheta = thetaEnd - thetaStart;
        return dTheta;
      }

      function rotateMap(angDeg) {
        let transform = mapGroup.attr('transform');
        mapGroup.attr('transform',function(){
          // let me = svg.node()
          // let x1 = me.getBBox().x + me.getBBox().width/2;//the center x about which you want to rotate
          // let y1 = me.getBBox().y + me.getBBox().height/2;//the center y about which you want to rotate
          let x1 = containerWidth/2;
          let y1 = containerHeight/2;
          // let angDeg = ang * 180 / Math.PI;
          return transform +` rotate(${angDeg}, ${x1}, ${y1})`;//rotate 180 degrees about x and y
        });
      }

      function getMapRotate(angDeg) {
        let x1 = containerWidth/2;
        let y1 = containerHeight/2;
        return `rotate(${angDeg}, ${x1}, ${y1})`;
      }

      function rotateIcons(angDeg) {
        // let angDeg = ang * 180 / Math.PI;
        let transform = iconsGroup.attr('transform');
        iconsGroup.attr('transform',function(){
          // let me = svg.node()
          // let x1 = me.getBBox().x + me.getBBox().width/2;//the center x about which you want to rotate
          // let y1 = me.getBBox().y + me.getBBox().height/2;//the center y about which you want to rotate
          let x1 = containerWidth/2;
          let y1 = containerHeight/2;
          return transform + ` rotate(${angDeg}, ${x1}, ${y1})`;//rotate 180 degrees about x and y
        });

        iconsGroup.selectAll("image")
        .attr('transform', (d) => {
          return transform + ` rotate(${-angDeg}, ${d.x+iconS/2}, ${d.y+iconS})`;
        })
      }

      function getRotateWords(angDeg) {
        // let angDeg = ang * 180 / Math.PI;
        let transform = wordsGroup.attr('transform');
        wordsGroup.attr('transform',function(){
          // let me = svg.node()
          // let x1 = me.getBBox().x + me.getBBox().width/2;//the center x about which you want to rotate
          // let y1 = me.getBBox().y + me.getBBox().height/2;//the center y about which you want to rotate
          let x1 = containerWidth/2;
          let y1 = containerHeight/2;
          return transform + ` rotate(${angDeg}, ${x1}, ${y1})`;//rotate 180 degrees about x and y
        });

        wordsGroup.selectAll("text")
        .attr('transform', (d) => {
          return transform + ` rotate(${-angDeg}, ${d.x+iconS/2}, ${d.y+iconS})`;
        })
      }


      function displayRoutes(steps) {
        for (let i = 0; i < steps.length-1; i++) {
          setRouteColors(steps[i].id, steps[i+1].id);

        }

      }

      function setRouteColors(start, end) {
        let path1 = start + "_" + end;
        let path2 = end + "_" + start;
        var pathIDs = ["porch1_foyer", "foyer_living", "living_kitchen", "kitchen_porch2", "living_hall", "hall_bedroom1", "hall_bathroom1", "hall_bedroom2", "bedroom2_bathroom2"];

        let path = path1;
        if (pathIDs.indexOf(path2) > -1) path = path2;

        var polygon = d3.select("g#paths").select("polygon#" + path);
        polygon.style("fill", d3.rgb(102,157,246)).style("stroke", d3.rgb(102,157,246))

        // if(Array.isArray(polygon._groups[0]) && polygon._groups[0].length) {
        //   return null;
        // }
      }


      let x = 80;
      let y = isMobile?-200:0;
      let t = d3.zoomIdentity.translate(x,y).scale(.92);
      svg.call(zoom.transform, t);
      svg.call(zoom);

    }

  }

  shouldComponentUpdate() {
    // Prevents component re-rendering
    return false;
  }

  _setRef(componentNode) {
    this._rootNode = componentNode;
  }

  dudeClicked = () => {

  }

  render() {
    return (
      <div className="Sketch Oogle">
        <div className="map" ref={this._setRef.bind(this)} />
        <div id="mapContainer"></div>

        <div id="BRButtons" className="buttonsDown">
          <div className="btn-group-vertical" role="group">
            <button type="button" id="zoomIn" className="btn btn-light mapButton"><i className="fas fa-plus"></i></button>
            <button type="button" id="zoomOut" className="btn btn-light mapButton"><i className="fas fa-minus"></i></button>
            <button id="dude" onClick={this.dudeClicked} type="button" className="btn btn-light"></button>
          </div>
        </div>
        <div id="mapData" className="computer">
          <span>Map Data &#169;2020</span>
          <span>United States</span>
          <span>Terms?</span>
          <span className="feedback"><a href="https://github.com/jdeboi/Oogle">Send feedback</a></span>
          <span className="legend"><div className="legendNum">3 ft</div><div className="legendBar"></div></span>
        </div>

      </div>
    )

  }
}

export default Oogle;
