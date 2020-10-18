import { shiftPosition } from "./randomPosition.js";
import { normalizeCoordinates } from "./transformCoordinates.js";
export default class Ship {


  isPositionAvalible(ship) {
      if (!this.isShipOnField(ship)) return false;
    const coordinates = this.getCoordinates(ship);
    for (let i of coordinates) {  
      const elem = document.getElementById(i);
      const attr = elem.getAttribute("class");
      if (attr != "empty") {
        console.log("can not to set ship in to this position", elem.id);
        return false;
      }
    }
    // show ship margin (for developing)
    for (let i of coordinates) {
      const elem = document.getElementById(i);
      if (!ship.coordinates.includes(i)) elem.classList.add("test");
    }
    return true;
  }
// this method is needed refactoring
  isShipOnField(ship) {
      const idx = ship.coordinates[0][0];
    return ship.coordinates.every((elem) => {
        return elem[0] === idx;
    })
}
  // get all coordinates including margins
  getCoordinates(ship) {
    const set = new Set();
    for (let i of ship.coordinates) {
        let coord = normalizeCoordinates(i);
        console.log('coord is: ', coord);
      set.add(normalizeCoordinates(i));
      if (coord[1] != "0") {
          if (0 <= (+i - 1) && (+i - 1) < 100) set.add(normalizeCoordinates(`${+i - 1}`));
          if (0 <= (+i + 10) && (+i + 10) < 100) set.add(normalizeCoordinates(`${+i + 9}`));
          if (0 <= (+i - 10) && (+i - 10) < 100) set.add(normalizeCoordinates(`${+i - 11}`));
      }
      if (coord[0] != "9") {
        if (0 <= (+i + 9) && (+i + 9) < 100) set.add(normalizeCoordinates(`${+i + 9}`));
        if (0 <= (+i + 11) && (+i + 11) < 100) set.add(normalizeCoordinates(`${+i + 11}`));
        if (0 <= (+i + 10) && (+i + 10) < 100) set.add(normalizeCoordinates(`${+i + 10}`));
      }
      if (coord[1] != "9") {
        if (0 <= (+i + 1) && (+i + 1) < 100) set.add(normalizeCoordinates(`${+i + 1}`));
        if (0 <= (+i - 9)  && (+i - 9) < 100) set.add(normalizeCoordinates(`${+i - 9}`));
        if (0 <= (+i + 11) && (+i + 11) < 100) set.add(normalizeCoordinates(`${+i + 11}`));
      }
      if (coord[0] != "0") {
        if (0 <= (+i - 9) && (+i - 9) < 100) set.add(normalizeCoordinates(`${+i - 9}`));
        if (0 <= (+i - 10) && (+i - 10) < 100) set.add(normalizeCoordinates(`${+i - 10}`));
        if (0 <= (+i - 11) && (+i - 11) < 100) set.add(normalizeCoordinates(`${+i - 11}`));
      }
    }
    return set;
  }
  establish(position, ship) {
    console.log(position);
    let currentShip = ship(position);
    if (!this.isPositionAvalible(currentShip)) {
      const newPosition = shiftPosition(position);
      console.log('new position is', newPosition)
      return this.establish(newPosition, ship);
    }
    const coordinates = currentShip.coordinates;
    for (let i of coordinates) {

      let elem = document.getElementById(normalizeCoordinates(i));
      elem.classList.add("ship");
    }
  }

  rotate(currentPosition) {}

  replace() {}
}