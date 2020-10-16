import Field from './controllers/Field.js';
import Fleet from './controllers/Fleet.js';
import Ship from './controllers/Ship.js';
import randomPosition from './controllers/randomPosition.js';

const field = new Field(10);
const fleet = new Fleet();
const ship = new Ship();

field.build();

// ship.establish('64', fleet.trippleDeckShip);
// ship.establish('21', fleet.sinleDeckShip);
ship.establish(randomPosition(), fleet.sinleDeckShip);


// check all ship's decks in the field
// check rotation possibilyty
