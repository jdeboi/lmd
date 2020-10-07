

export function doorCrossing(nextPos, doors, config={x:0, y:0, scaler:1}) {
  if (!nextPos || !doors) return null;
  for (let d = 0; d < doors.length; d++) {

    var door = {...doors[d]};
    door.x0 = (door.x0+config.x)*config.scaler;
    door.y0 = (door.y1+config.y)*config.scaler;
    door.x1 = (door.x0+config.x)*config.scaler;
    door.y1 = (door.y1+config.y)*config.scaler;
    console.log(door.x0, door.y0, nextPos.x, nextPos.y);
    // if (intersects(pos.x,pos.y,nextPos.x,nextPos.y,points[p].x,points[p].y,points[p+1].x,points[p+1].y)) {
    if (intersects(nextPos.x,nextPos.y,door.x0,door.y0,door.x1,door.y1, 30)) {
      return doors[d].to;
    }
  }
  return null;
}

export function boundaryCrossing(nextPos, points, config={x:0, y:0, scaler:1}) {
  if (!nextPos || !points) return false;
  for (let p = 0; p < points.length - 1; p++) {
    const point0 = {...points[p]};
    const point1 = {...points[p+1]};
    point0.x = (point0.x+config.x)*config.scaler;
    point0.y = (point0.y+config.y)*config.scaler;
    point1.x = (point1.x+config.x)*config.scaler;
    point1.y = (point1.y+config.y)*config.scaler;

    // if (intersects(pos.x,pos.y,nextPos.x,nextPos.y,points[p].x,points[p].y,points[p+1].x,points[p+1].y)) {
    if (intersects(nextPos.x,nextPos.y,point0.x,point0.y,point1.x,point1.y, 30)) {
      return true;
    }
  }
  return false;
}

//https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function intersectsOG(a,b,c,d,p,q,r,s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};

// point p intersects with a line defined between two points, l0 and l1
function intersects(px, py, l0x, l0y, l1x, l1y, w) {
  return distToSegment({x: px, y: py}, {x: l0x, y: l0y}, {x: l1x, y: l1y}) < w;
}

function sqr(x) { return x * x }
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, { x: v.x + t * (w.x - v.x),
    y: v.y + t * (w.y - v.y) });
  }
  function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }
