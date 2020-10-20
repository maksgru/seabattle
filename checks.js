import { normalizeCoordinates, attrToCoord } from './transformCoordinates.js';

function isPositionAvalible(ship) {
  if (isShipOnField(ship)) return false;
  const coordinates = getCoordinates(ship);
  console.log(coordinates)
  for (let i of coordinates) {
    const elem = document.getElementById(i);
    const attr = elem.dataset.ship;
    if (attr != "empty") {
      console.log("can not set ship into this position", elem.id);
      return false;
    }
  }

  return true;
}

function isShipOnField(ship) {
  const head = ship.direction;
  const idx =
    head === "up" || head === "down"
      ? ship.coordinates[0][0]
      : ship.coordinates[0][1];
  const i = head === "up" || head === "down" ? 0 : 1;
  return ship.coordinates.every((elem) => {
    return elem[i] == idx;
  });
}
// get all coordinates including margins
function getCoordinates(ship) {
  const set = new Set();
  // debugger
  for (let i of ship.coordinates) {
    let coord = normalizeCoordinates(i);
    console.log("coord is: ", coord);
    set.add(normalizeCoordinates(i));
    const { x, y } = attrToCoord(i);
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
export { isPositionAvalible };