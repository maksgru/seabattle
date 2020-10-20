import { normalizeCoordinates, attrToCoord } from './transformCoordinates.js'

function randomPosition() {
  return Math.floor(Math.random() * 100);
}

function shiftShipPosition(ship) {
  let newCoordinates = [];
  for (let i of ship.coordinates) {
    let coordinate = +Object.keys(i) + 1;
    if (coordinate > 99) coordinate = coordinate - 100;
    newCoordinates.push({ [coordinate]: 'safe' });
  }
  ship.coordinates = newCoordinates;
  console.log('shifted coordinates is', newCoordinates)
  return ship;

}
// get all occupied positions on the field
function getOccupiedPositions(ships) {
  let positions = [];
  for (let ship of ships) {
    for (let position of ship.coordinates) {
      positions.push(String(Object.keys(position)));
    }
  }
  return positions;
}

function randomDirection() {
  const direction = Math.random() >= 0.5 ? 'vertical' : 'horizontal';
  return direction;
}

// get all coordinates including margins
function getMarginPositions(ship) {
  const set = new Set();
  let coordinates = [];
  for (let position of ship.coordinates) {
    coordinates.push(String(Object.keys(position)))
  }
  console.log('coordinates is ', coordinates)
  for (let i of coordinates) {
    let position = normalizeCoordinates(i);
    console.log('position is ', position)
    set.add(normalizeCoordinates(i));
    const { x, y } = attrToCoord(position);
    console.log('x = ', x, 'y = ', y)
    if (x + 1 < 10 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${+i - 1}`));
      set.add(normalizeCoordinates(`${+i + 9}`));
      set.add(normalizeCoordinates(`${+i + 10}`));
    }
    if (x + 1 < 10 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${+i + 10}`));
      set.add(normalizeCoordinates(`${+i + 11}`));
      set.add(normalizeCoordinates(`${+i + 1}`));
    }
    if (x - 1 >= 0 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${+i + 1}`));
      set.add(normalizeCoordinates(`${+i - 9}`));
      set.add(normalizeCoordinates(`${+i - 10}`));
    }
    if (x - 1 >= 0 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${+i - 10}`));
      set.add(normalizeCoordinates(`${+i - 11}`));
      set.add(normalizeCoordinates(`${+i - 1}`));
    }
  }
  return set;
}

export {
  randomPosition,
  shiftShipPosition,
  getOccupiedPositions,
  randomDirection,
  getMarginPositions
};