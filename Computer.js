import { randomPosition } from "./positionHelpers.js";
import { normalizeCoordinates } from "./transformCoordinates.js";
import { getDiagonalMargins, getLineMaggins } from "./computerHelpers.js";
import User from "./User.js";

export default class Computer extends User {
  constructor(name, enemyField) {
    super(name, enemyField);
    this.targets = this.getTargets();
    this.suspectedPositions = [];
  }
// todo find out where refreshSuspectedPositions() is needed to use
  shoot() {
    this.refreshSuspectedPositions();
    let position = this.getRandomTarget();
    if (this.suspectedPositions.length > 0) position = this.suspectedPositions[0];
    const target = super.shoot(position);
    this.removeTarget(position); 
    if (target) {
      this.suspectedPositions.push(...getLineMaggins(target));
      this.removeKilled();
      this.removeDiagonalMargins(target);
    }
    this.refreshSuspectedPositions();
    return target;
  }

  removeKilled() {
    if (this.killed.length) {
      let margins = [];
      this.killed.forEach(item => {
        item = normalizeCoordinates(item);
        margins.push(...getLineMaggins(item));
      });
      margins.forEach((item) => {
        item = normalizeCoordinates(item);
        if (this.suspectedPositions.includes(item)) {
          let index = this.suspectedPositions.indexOf(item);
          this.suspectedPositions.splice(index, 1);
        }
        if (this.targets.includes(item)) {
          let index = this.targets.indexOf(item);
          this.targets.splice(index, 1);
        }
        document.querySelector(`[data-user="${item}"]`).classList.add('shoted');
      });
    }
    this.refreshSuspectedPositions();
  }

  refreshSuspectedPositions() {
    if (this.suspectedPositions.length > 0) {
      this.suspectedPositions.forEach((item, index) => {
        if (!this.targets.includes(item)) {
          this.suspectedPositions.splice(index, 1);
        }
      });
    }
  }

  removeTarget(target) {
    const idx = this.targets.indexOf(target);
    this.targets.splice(idx, 1);
    this.refreshSuspectedPositions();
  }

  removeDiagonalMargins(target) {
    const margins = getDiagonalMargins(target);
    for (let target of margins) {
      if (this.targets.includes(target)) {
        const idx = this.targets.indexOf(target);
        this.targets.splice(idx, 1);
        this.enemyField.shootPosition(target);
      }
    }
    this.refreshSuspectedPositions();
  }

  getRandomTarget() {
    const range = this.targets.length;
    console.log('range', range);
    console.log('targets', this.targets)
    const randomIndex = randomPosition(range);
    const target = this.targets[randomIndex - 1];
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
