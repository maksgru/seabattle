export default class Ship {
    constructor(type) {
        this.type = type;
    }
    
    isShipOnRib(position) {
        const upRib = position < 10 ? true : false;
        const rightRib = (position + 1) % 10 ? false : true;
        const downRib = 89 < position < 100 ? true : false;
        const leftRib = position % 10 ? false : true;
        return {
            up: upRib,
            right: rightRib,
            down: downRib,
            left: leftRib
        }
    }

    isPositionAvalible(position, ship) {
        
        return isAvalible;
    }


    establish(currentPosition) {

    }

    rotate(currentPosition) {

    }

    replace() {

    }

}