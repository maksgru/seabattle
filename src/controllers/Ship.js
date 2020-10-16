import randomPosition from './randomPosition.js';
import transformCoordinates from './transformCoordinates.js';


export default class Ship {

    isPositionAvalible(ship) {
        const coordinates = this.getCoordinates(ship);
        for (let i of coordinates) {
                const elem = document.getElementById(i);
                const attr = elem.getAttribute('class');
                if (attr != 'empty') {
                    console.log('can not to set ship in to this position', elem.id)
                    return false;
                }
                // elem.innerHTML = `${ship.name[0]} ${ship.name.slice(-1)}`
        }
        // show ship margin (for developing)
        for (let i of coordinates) {
            const elem = document.getElementById(i);
            if (!ship.coordinates.includes(i)) elem.classList.add('test');
        }
        return true;
    }
    // get all coordinates including margins
    getCoordinates(ship) {
        const set = new Set(ship.coordinates);
        for (let i of ship.coordinates) {
            set.add(i);
            set.add(`${+i + 1}`);
            set.add(`${+i - 1}`);
            set.add(`${+i + 10}`);
            set.add(`${+i + 11}`);
            set.add(`${+i + 9}`);
            set.add(`${+i - 10}`);
            set.add(`${+i - 9}`);
            set.add(`${+i - 11}`);
        }
        return set;
    }
    getPosition() {

        return

    }

    establish(position, ship) {
        console.log(position)
        let currentShip = ship(position);
        if(!this.isPositionAvalible(currentShip)) {    
            position = `${+position + 1}`;
            return this.establish(position,ship);
        }
        const coordinates = currentShip.coordinates;
        for (let i of coordinates) {
            let elem = document.getElementById(i);
            elem.classList.add('ship');
        }
    }

    rotate(currentPosition) {

    }

    replace() {

    }

}

// const sinleDeckShip = (position) => {
//     return {
//         name: 'singleDeck1',
//         coordinates: [`${position}`]
//     }
// }

// const trippleDeckShip = (position) => {
//     return {
//         name: 'trippleDeck1',
//         orientation: 'verticalHeadUp',
//         coordinates: [`${position}`, `${+position + 1}`, `${+position + 2}`]
//     }

// }

// const ship = new Ship();

// ship.establish('65', trippleDeckShip);

// const smallShip = new Ship();
// smallShip.establish('21', sinleDeckShip);
