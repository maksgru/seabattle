import { idToAttr, normalizeCoordinates } from './transformCoordinates.js';
import Ship from './Ship.js';
import { randomDirection, randomPosition, shiftShipPosition, getOccupiedPositions } from './positionHelpers.js';
import { isPositionAvalible } from './checks.js';



export default class Field {
  constructor(name) {
    this.name = name;
    this.ships = [];
    this.build(name);
  }
  build(name) {
    const field = document.createElement('div');
    field.id = name;
    root.append(field);
    for (let i = 0; i < 100; i++) {
      const div = document.createElement("div");
      div.className = "empty";
      div.dataset[name] = idToAttr(i);
      // div.innerHTML = idToAttr(i);
      field.append(div);
    }
    this.establishShips();
  }

  establishShips() {

    const shipRestriction = {
      1: 4,
      2: 3,
      3: 2,
      4: 1
    }
    for (let i = 1; i < 5; i++) {
      for (let ship = 0; ship < i; ship++) {
        const direction = randomDirection();
        const position = randomPosition();
        const decks = shipRestriction[[i]];
        const owner = this.name;
        const ship = new Ship(owner,position, decks, direction);
        this.ships.push(this.establish(ship));
      }
    }
  }
  establish(ship) {
    const positions = getOccupiedPositions(this.ships);
    console.log(positions);
    if (!isPositionAvalible(ship, positions)) {
      const newShip = shiftShipPosition(ship);
      return this.establish(newShip);
    }
    const coordinates = ship.coordinates;
    for (let i of coordinates) {
      let idx = normalizeCoordinates(String(Object.keys(i)));
      let elem = document.querySelector(`[data-${ship.owner}="${idx}"]`);
      elem.className = "ship";
    }
    return ship;
  }
  rotate() { }
  isRotationAvalible() { }
  replace() { }
}
