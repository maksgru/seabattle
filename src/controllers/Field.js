import {  idToAttr} from './transformCoordinates.js';
// import Field from './Field.js';
import Fleet from './Fleet.js';
import Ship from './Ship.js';
import { randomPosition } from './randomPosition.js';

const fleet = new Fleet();

export default class Field {
  constructor(size) {
    this.size = size;
    this.square = size * size;
    this.ships = [];
  }
  build() {
    const field = document.createElement('div');
    field.id = 'userField';
    root.append(field);
    field.style.cssText = `
    margin: 0 30% 0 30%; 
    display: grid; 
    grid-template-rows: repeat(${this.size}, 30px); 
    grid-template-columns: repeat(${this.size}, 30px);`;
    
    for (let i = 0; i < this.square; i++) {
      const div = document.createElement("div");
      div.className = "empty";
      div.dataset.ship = 'empty';
      div.id = idToAttr(i);
      div.innerHTML = idToAttr(i);
      field.append(div);
    }
    
    // this.establishShips();
  }
  
  establishShips () {
    
    // const shipRestriction = {
      //   1: 4,
      //   2: 3,
      //   3: 2,
      //   4: 1
      // }
      for (let i = 0; i < 3; i++) {
        const position = randomPosition();
        const ship = new Ship(/*position, deckSize, direction*/);
        this.ships.push(ship);

      ship.establish(position, fleet.trippleDeckShip);
      
    }
    
  }

}
