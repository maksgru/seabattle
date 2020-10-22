import { randomPosition } from './positionHelpers.js'
import { normalizeCoordinates, attrToCoord } from './transformCoordinates.js';
import User from './User.js'

export default class Computer extends User {
  constructor(name, enemyField) {
    super(name, enemyField);
    this.targets = this.getTargets();
    this.suspectedPositions = [];
    this.currentShip = [];
  }
  shoot(position = null) {

  }




  
  refreshSuspectedPositions() {
    if (this.suspectedPositions) {
      this.targets.forEach((item, index) => {
        if (this.suspectedPositions.includes(item)) {
          this.suspectedPositions.splice(index, 1)
        }
      })
    }
  }



  removeDiagonalMargins(margins) {
    for (let target of margins) {
      if (this.targets.includes(target)) {
        const idx = this.targets.indexOf(target);
        this.targets.splice(idx, 1);
        this.enemyField.shootPosition(target)
      }
    }
  }


  getLineMaggins(target) {
    let set = new Set();
    target = +target;
    const { x, y } = attrToCoord(normalizeCoordinates(target));
    if (x + 1 < 10 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${target - 1}`));
      set.add(normalizeCoordinates(`${target + 10}`));
    }
    if (x + 1 < 10 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${target + 10}`));
      set.add(normalizeCoordinates(`${target + 1}`));
    }
    if (x - 1 >= 0 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${target + 1}`));
      set.add(normalizeCoordinates(`${target - 10}`));
    }
    if (x - 1 >= 0 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${target - 10}`));
      set.add(normalizeCoordinates(`${target - 1}`));
    }
    return Array.from(set);
  }


  getDiagonalMargins(target) {
    let set = new Set();
    target = +target;
    console.log(target)
    const { x, y } = attrToCoord(normalizeCoordinates(target));
    if (x + 1 < 10 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${target + 9}`));
    }
    if (x + 1 < 10 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${target + 11}`));
    }
    if (x - 1 >= 0 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${target - 9}`));
    }
    if (x - 1 >= 0 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${target - 11}`));
    }
    return Array.from(set);
  }
  getRandomTarget() {
    const range = this.targets.length;
    const randomIndex = randomPosition(range);
    const target = this.targets[randomIndex];
    return target;
  }
  getTargets() {
    let arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push(normalizeCoordinates(i));
    }
    return arr;
  }
}