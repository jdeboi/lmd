// getEarMenu() {
//   let ears = ["👂🏿","👂🏾","👂🏽","👂🏼", "👂🏻"];
//   return (
//     <Frame title="" content={
//         <div className="ears">
//           {ears.map((val, i) => {
//             return <Button key={i} className={"ear" +  (this.props.cursor>-1?" earCursor-"+this.props.cursor:"")} variant="outlined">{val}</Button>
//           })}
//         </div>
//       }
//       width={80} height={97*ears.length} windowStyle={{background:"transparent"}} x={window.innerWidth-100} y={(window.innerHeight-80-97*ears.length)/2}
//       />
//   );
// }
//
// earChange(index) {
//   // console.log(index);
//   this.setState({earCursor: index});
//   if (this.state.volume === 0) this.setState({volume:this.minVol});
//   this.audioPlayer.audioEl.current.play();
// }
//
// _onMouseMove(e) {
//   if (this.state.volume > 0) {
//     let x = e.screenX;
//     let y = e.screenY;
//     let dx = window.innerWidth/2-x;
//     let dy = window.innerHeight/2-y;
//     let maxD = Math.sqrt((window.innerWidth/2)*(window.innerWidth/2) + (window.innerHeight/2)*(window.innerHeight/2))
//     let dis = Math.sqrt(dx*dx + dy*dy);
//     if (dis === 0) dis =  this.minVol;
//     let disMapped = mapVal(dis, 0, maxD/2, .8, 0);
//     if (disMapped > 1) disMapped = 1;
//     else if (disMapped < 0) disMapped = this.minVol;
//     // console.log("dis", dis, disMapped);
//
//     this.setState({volume: disMapped});
//   }
//
// }
