
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
      positions = positions.map(item => String(Object.keys(item)));
      if (positions.includes(target)) {
        const idx = positions.indexOf(target);
        this.enemyField.ships[i].coordinates[idx][target] = 'injured';
        this.frags.push(target);
        this.enemyField.killPosition(target);
        if (this.isKilled(this.enemyField.ships[i])) {
          this.killed.push(...positions);
        }
        return target;
      }
    }
    return false
  }

  isKilled(ship) {
    return ship.coordinates.every(item => {
      const key = Object.keys(item);
      return item[key] == 'injured';
    })
  }
}