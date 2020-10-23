
export default class User {
  constructor(name, enemyField) {
    this.name = name;
    this.enemyField = enemyField;
    this.frags = [];
  }
  shoot(target) {
    this.enemyField.shootPosition(target);
    // amount of ships = 10 
    for (let i = 0; i < 10; i++) {
      let positions = this.enemyField.ships[i].coordinates;
      positions = positions.map(item => String(Object.keys(item)));
      if (positions.includes(target)) {
        positions[target] = 'injured';
        this.frags.push(target);
        this.enemyField.killPosition(target);
        return target;
      }
    }
    return false
  }

}