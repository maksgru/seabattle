import Field from './controllers/Field.js';
import Fleet from './controllers/Fleet.js';
import Ship from './controllers/Ship.js';
import { randomPosition } from './controllers/randomPosition.js';

const field = new Field(10);
const fleet = new Fleet();
const ship = new Ship();



field.build();

userField.addEventListener('click', (e) => rotationHandler(e));

function rotationHandler(e) {
    console.log('e', e.target);
}


// check all ship's decks in the field
// check rotation possibilyty
