/////////////////////////////////////////////
// HELPERS

function find_angle(A,C,B) {
  // c is center point
  let v1x = B.x - C.x;
  let v1y = B.y - C.y;
  let v2x = A.x - C.x;
  let v2y = A.y - C.y;
  return Math.atan2(v1x, v1y) - Math.atan2(v2x, v2y);
}

function getPointByID(points, id) {
  let index = points.findIndex(function(point) {
    return point.id == id;
  });

  if (index >= 0) return points[index];
  return null;
}

export function getPointByName(points, name) {
  let index = points.findIndex(function(point) {
    return point.name == name;
  });

  if (index >= 0) return points[index];
  return null;
}

export function objectEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object
}

export function dist(x0, y0, x1, y1) {
  let dx = x1 - x0,
  dy = y1 - y0;
  return dx * dx + dy * dy;
}
