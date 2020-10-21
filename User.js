
export default class User {
    constructor (name, enemyField) {
        this.name = name;
        this.enemyField = enemyField;
        this.frags = [];
    }
    shoot(target, previousTarget = '') {
console.log('hello')
        // this.enemyField.killPosition(target);

        // 
        // check avalible positions for shooting
        // getAvalible positions for shooting +/- horizontally or vertically
        // getRandom value of avaliblepositions.length 
        // target = avaliblePositions[value]
        
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