import { idToAttr, normalizeCoordinates } from "./transformCoordinates.js";
import Ship from "./Ship.js";
import {
  randomDirection,
  randomPosition,
  shiftShipCoordinates,
  getOccupiedPositions,
  getShipMargins,
} from "./positionHelpers.js";
import { isPositionAvalible } from "./checks.js";

export default class Field {
  constructor(name) {
    this.name = name;
    this.ships = [];
    this.build(name);
  }
  build(name) {
    const field = document.createElement("div");
    field.id = name;
    root.append(field);
    for (let i = 0; i < 100; i++) {
      const div = document.createElement("div");
      div.className = "empty";
      div.dataset[name] = idToAttr(i);
      div.innerHTML = idToAttr(i);
      field.append(div);
    }
    this.establishShips();
  }

  establishShips() {
    const shipRestriction = { 1: 4, 2: 3, 3: 2, 4: 1 };
    for (let i = 1; i < 5; i++) {
      for (let ship = 0; ship < i; ship++) {
        const direction = randomDirection();
        const position = randomPosition();
        const decks = shipRestriction[[i]];
        const owner = this.name;
        const ship = new Ship(owner, position, decks, direction);
        this.ships.push(this.establish(ship));
      }
    }
  }
  establish(ship) {
    const positions = getOccupiedPositions(this.ships);
    if (!isPositionAvalible(ship, positions)) {
      const newShip = shiftShipCoordinates(ship);
      return this.establish(newShip);
    }
      // it can be replaced in separated function e.g. paintShip(ship)
    const coordinates = ship.coordinates;
    for (let i of coordinates) {
      let idx = normalizeCoordinates(String(Object.keys(i)));
      if (ship.owner == "user") {
        let elem = document.querySelector(`[data-${ship.owner}="${idx}"]`);
        elem.className = "ship";
      }
    }
    return ship;
  }
  shootPosition(position) {
    position = normalizeCoordinates(position);
    let elem = document.querySelector(`[data-${this.name}="${position}"]`);
    elem.classList.add("shoted");
  }
  killPosition(position) {
    position = normalizeCoordinates(position);
    let elem = document.querySelector(`[data-${this.name}="${position}"]`);
    elem.classList.add("killed");
  }


  // todo check direction 
  // todo check is position avalible
  rotate(ship) {

    // todo instead of following code use calculateShipPositions()
    /* ------------------------------------------------------------------------ */
    const coordinates = ship.coordinates.map((elem) => Object.keys(elem));
    const oldDirection = ship.direction;
    const oldCoordinates = ship.coordinates;
    let occupiedPositions = getOccupiedPositions(this.ships)
    occupiedPositions = this.excludeCurrentShip(ship, occupiedPositions);
    const index = ship.direction == 'horizontal' ? 1 : 10;
    
    let newCoordinates = [{[String(coordinates[0])]: 'safe'}];
    
    for (let i = 1; i < coordinates.length; i++) {
      let coordinate = +coordinates[0] + i * index;
      if (+coordinate > 99) coordinate = +coordinate - 100;
      newCoordinates.push({ [coordinate]: "safe" });
    }
/* -------------------------------------------------------------- */

    ship.direction = index == 1 ? 'vertical' : 'horizontal';
    ship.coordinates = newCoordinates;
 
    if (!isPositionAvalible(ship, occupiedPositions)) {
      ship.coordinates = oldCoordinates;
      ship.direction = oldDirection;
      console.log('rotation impossible')
      return false;
    }
    // it can be replaced in separated function e.g. paintShip(ship)
    const positions = ship.coordinates;
    for (let i of positions) {
      let idx = normalizeCoordinates(String(Object.keys(i)));
      if (ship.owner == "user") {
        let elem = document.querySelector(`[data-${ship.owner}="${idx}"]`);
        elem.className = "ship";
      }
    }
    return true;
  }
excludeCurrentShip(ship, positions) {
  let shipMargins = getShipMargins(ship);
  shipMargins.forEach((element) => {
    if (positions.includes(element)) {
      let idx = positions.indexOf(element);
      positions.splice(idx, 1);
    }
  });
  return positions;
}

  replace(ship, position) {

  }

  isReplaceAvalible(ship, position) {
    return true
  }
}
