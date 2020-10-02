
export function doorCrossing(nextPos, doors) {
  for (let d = 0; d < doors.length; d++) {
    // if (intersects(pos.x,pos.y,nextPos.x,nextPos.y,points[p].x,points[p].y,points[p+1].x,points[p+1].y)) {
    if (intersects(nextPos.x,nextPos.y,doors[d].x0,doors[d].y0,doors[d].x1,doors[d].y1, 30)) {
      return doors[d].to;
    }
  }
  return null;
}

export function boundaryCrossing(nextPos, points) {
  for (let p = 0; p < points.length - 1; p++) {
    // if (intersects(pos.x,pos.y,nextPos.x,nextPos.y,points[p].x,points[p].y,points[p+1].x,points[p+1].y)) {
    if (intersects(nextPos.x,nextPos.y,points[p].x,points[p].y,points[p+1].x,points[p+1].y, 30)) {
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
