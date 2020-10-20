import { normalizeCoordinates, attrToCoord } from './transformCoordinates.js';
import { getMarginPositions } from './positionHelpers.js';

function isPositionAvalible(ship, positions) {
  if (!isShipOnField(ship)) return false;
  const coordinates = getMarginPositions(ship);

  for (let coordinate of coordinates) {
    for (let position of positions) {
      if (position == coordinate) {
        console.log("can not set ship into this position", position);
        return false;
      }
    }
  }
  console.log(coordinates)
  // for (let i of coordinates) {
  //   document.querySelector(`[data-${ship.owner}='${i}']`).className = 'test'
  // }
  return true;
}

function isShipOnField(ship) {
  let headPosition = String(Object.keys(ship.coordinates[0]));
  headPosition = normalizeCoordinates(headPosition);
  const idx = ship.direction == 'vertical' ? headPosition[0] : headPosition[1];
  const baseIndex = ship.direction == 'vertical' ? 0 : 1;
  let positions = [];
  for (let position of ship.coordinates) {
    positions.push(String(Object.keys(position)));
 }
  return positions.every((elem) => {
    return elem[baseIndex] == idx;
  });
}


export { isPositionAvalible };