import { normalizeCoordinates, attrToCoord } from './transformCoordinates.js'

function randomPosition(range = 99) {
  const position = Math.floor(Math.random() * range + 1);
  return position;
}

function shiftShipCoordinates(ship) {
  let newCoordinates = [];
  for (let i of ship.coordinates) {
    let coordinate = +Object.keys(i) + 1;
    if (coordinate > 99) coordinate = coordinate - 100;
    newCoordinates.push({ [coordinate]: 'safe' });
  }
  ship.coordinates = newCoordinates;
  return ship;

}
// get all occupied positions on the field
function getOccupiedPositions(ships) {
  let positions = [];
  for (let ship of ships) {
    for (let position of ship.coordinates) {
      position = String(Object.keys(position));
      position = normalizeCoordinates(position)
      positions.push(position);
    }
  }
  return positions;
}

function randomDirection() {
  const direction = Math.random() >= 0.5 ? 'vertical' : 'horizontal';
  return direction;
}

function getPositionMargins(position) {
  let margins = new Set();
  position = normalizeCoordinates(position);
  margins.add(position);
  const { x, y } = attrToCoord(position);
    if (x + 1 < 10 && y - 1 >= 0) {
      margins.add(normalizeCoordinates(`${+position - 1}`));
      margins.add(normalizeCoordinates(`${+position + 9}`));
      margins.add(normalizeCoordinates(`${+position + 10}`));
    }
    if (x + 1 < 10 && y + 1 < 10) {
      margins.add(normalizeCoordinates(`${+position + 10}`));
      margins.add(normalizeCoordinates(`${+position + 11}`));
      margins.add(normalizeCoordinates(`${+position + 1}`));
    }
    if (x - 1 >= 0 && y + 1 < 10) {
      margins.add(normalizeCoordinates(`${+position + 1}`));
      margins.add(normalizeCoordinates(`${+position - 9}`));
      margins.add(normalizeCoordinates(`${+position - 10}`));
    }
    if (x - 1 >= 0 && y - 1 >= 0) {
      margins.add(normalizeCoordinates(`${+position - 10}`));
      margins.add(normalizeCoordinates(`${+position - 11}`));
      margins.add(normalizeCoordinates(`${+position - 1}`));
    }
  return margins
}
// get all coordinates including margins
function getShipMargins(ship) {
  const set = new Set();
  let coordinates = [];
  for (let position of ship.coordinates) {
    coordinates.push(String(Object.keys(position)))
  }
  for (let i of coordinates) {
    let margins = getPositionMargins(i);
    for (i of margins) set.add(i);

  }
  return set;
}

function calculateShipPositions(ship, position) {
  position = +position;
  const direction = ship.direction;
  const deckSize = ship.coordinates.length;
  let coordinates = [{ [normalizeCoordinates(position)]: 'safe' }];
  let index = direction === 'vertical' ? 1 : 10;
  for (let i = 1; i < deckSize; i++) {
    position = position + index;
    if (position > 99) position = position - 100;
    coordinates.push({ [normalizeCoordinates(position)]: 'safe' })
  }
  return coordinates;
}

export {
  randomPosition,
  shiftShipCoordinates,
  getOccupiedPositions,
  randomDirection,
  getShipMargins,
  getPositionMargins,
  calculateShipPositions
};