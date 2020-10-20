import {  idToAttr, normalizeCoordinates } from './transformCoordinates.js';
import Ship from './Ship.js';
import { randomPosition, shiftPosition } from './randomPosition.js';
import { isPositionAvalible } from './checks.js';



export default class Field {
  constructor(name) {
    this.ships = [];
    this.area = this.build(name);
  }
  build(name) {
    const field = document.createElement('div');
    field.id = name;
    root.append(field);
    let state = [];
    for (let i = 0; i < 100; i++) {
      const div = document.createElement("div");
      div.className = "empty";
      div.dataset.ship = 'empty';
      div.id = idToAttr(i);
      div.innerHTML = idToAttr(i);
      field.append(div);
      state.push({status:'empty'})
    }
    this.establishShips();
    return state;
  }
  
  establishShips () {
    
    // const shipRestriction = {
      //   1: 4,
      //   2: 3,
      //   3: 2,
      //   4: 1
      // }
      for (let i = 0; i < 1; i++) {
        const position = randomPosition();
        const ship = new Ship(position, 2);
        this.ships.push(ship);
        this.establish(ship)
      
    }
    
  }
  establish(ship) {
    console.log('position is', ship.coordinates[0]);
    console.log(isPositionAvalible(ship))
    // if (!isPositionAvalible(ship)) {
    //   const newShip = shiftPosition(ship);
    //   return this.establish(newShip);
    // }
    const coordinates = ship.coordinates;
    console.log(coordinates)
    for (let i of coordinates) {
      let elem = document.getElementById(i);
      elem.className = "ship";
    }
  }
  rotate() {}
  isRotationAvalible() {}
  replace() { }
}
