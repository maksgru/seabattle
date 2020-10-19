import { shiftPosition } from "./randomPosition.js";
import { normalizeCoordinates, attrToCoord } from "./transformCoordinates.js";

export default class Ship {



  isPositionAvalible(ship) {
    if (!this.isShipOnField(ship)) return false;
    const coordinates = this.getCoordinates(ship);
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

  isShipOnField(ship) {
    const head = ship.orientation;
    const idx = head === 'up' || head === 'down' ? ship.coordinates[0][0] : ship.coordinates[0][1];
    const i = head === 'up' || head === 'down' ? 0 : 1;
    return ship.coordinates.every((elem) => {
      return elem[i] == idx;
    })
  }
  // get all coordinates including margins
  getCoordinates(ship) {
    const set = new Set();
    // debugger
    for (let i of ship.coordinates) {
      let coord = normalizeCoordinates(i);
      console.log('coord is: ', coord);
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

  establish(position, ship, orientation) {
    console.log(position);
    let currentShip = ship(position, orientation);
    if (!this.isPositionAvalible(currentShip)) {
      const newPosition = shiftPosition(position);
      console.log('new position is', newPosition)
      return this.establish(newPosition, ship);
    }
    const coordinates = currentShip.coordinates;
    const main = coordinates[0];
    for (let i of coordinates) {

      let elem = document.getElementById(normalizeCoordinates(i));
      elem.className = "ship";
      elem.dataset.ship = currentShip.name;
      elem.dataset.head = currentShip.orientation;
      elem.dataset.main = main;
    }
  }

  rotate(name, ship) {
    const position = name[name.length - 2] + name[name.length - 1];
    const decks = document.querySelectorAll(`.ship[data-ship="${name}"]`);
    decks.forEach((item) => {
      item.className = 'empty';
      item.removeAttribute('data-name');
      item.removeAttribute('data-head');
      item.removeAttribute('data-main');
      item.dataset.ship = 'empty';
    });
    this.establish()

  }

  isRotationAvalible(ship) {
    const heads = ['up', 'left', 'down', 'right'];
    const elem = document.getElementByI(ship.coordinates[0]);
    let idx = heads.indexOf(elem.dataset.head) + 1;
    if (elem.dataset.head == 'right') idx = 0;

  }
  replace() { }
}