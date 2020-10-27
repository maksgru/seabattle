import { normalizeCoordinates } from "./transformCoordinates.js";

export default class User {
  constructor(name, enemyField) {
    this.name = name;
    this.enemyField = enemyField;
    this.frags = [];
    this.killed = [];
  }
  shoot(target) {
    this.enemyField.shootPosition(target);
    // amount of ships = 10 
    for (let i = 0; i < 10; i++) {
      let positions = this.enemyField.ships[i].coordinates;
      positions = positions.map(item => String(normalizeCoordinates(Object.keys(item))));
      if (positions.includes(target)) {
        const idx = positions.indexOf(target);
        this.enemyField.ships[i].coordinates[idx][target] = 'injured';
        this.frags.push(target);
        this.enemyField.killPosition(target);
        if (this.isKilled(this.enemyField.ships[i])) {
          this.killed.push(...positions);
        }
        this.killShip();
        return target;
      }
    }
    return false
  }

  isKilled(ship) {
    return ship.coordinates.every(item => {
      let key = String(Object.keys(item));
      key = normalizeCoordinates(key);
      return item[key] == 'injured';
    })
  }
    killShip() {
      this.killed.forEach(item => {
        document.querySelector(`[data-${this.enemyField.name}="${item}"]`).className = 'kill';
      });
    }
}