import Field from './Field.js';

const field = new Field('userField');


userField.addEventListener('click', rotationHandler);

function rotationHandler() {
    console.log(ship.data.decks[2]);
    ship.data.decks[2] = {14: 'injured'};
    userField.removeEventListener('click', rotationHandler)
}
const cell = document.getElementById('12');

cell.addEventListener('click', () => {
    console.log(ship.data.decks[2])
})

// check all ship's decks in the field
// check rotation possibilyty
