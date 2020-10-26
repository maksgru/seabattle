import { normalizeCoordinates, attrToCoord } from './transformCoordinates.js';
import { getShipMargins } from './positionHelpers.js';

function isPositionAvalible(ship, positions) {
  if (!isShipOnField(ship)) {
    console.log('ship out of field')
    return false;
  }
  const coordinates = getShipMargins(ship);
  for (let coordinate of coordinates) {
    for (let position of positions) {
      if (position == coordinate) {
        // console.log("can not set ship into this position", position);
        return false;
      }
    }
  }
  // for (let i of coordinates) {
  //   document.querySelector(`[data-${ship.owner}='${i}']`).className = 'test'
  // }
  return true;
}

function isShipOnField(ship) {
  let headPosition = String(Object.keys(ship.coordinates[0]));
  headPosition = normalizeCoordinates(headPosition);
  const idx = ship.direction == 'horizontal' ? headPosition[1] : headPosition[0];
  const baseIndex = ship.direction == 'horizontal' ? 1 : 0;
  const index = ship.direction == 'horizontal' ? 0 : 1;
  let positions = [];
  for (let position of ship.coordinates) {
    position = String(Object.keys(position));
    position = normalizeCoordinates(position);
    positions.push(position);
 }
 const withoutHead = positions.slice(1);
 for (let position of withoutHead) {
   if (position[index] == 0) return false;
 }
  return positions.every((elem) => {
    console.log('elem', elem);
    console.log('idx'. idx)
    return elem[baseIndex] == idx;
  });
}


export { isPositionAvalible };