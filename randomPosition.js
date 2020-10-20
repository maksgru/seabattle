import { normalizeCoordinates } from './transformCoordinates.js'

function randomPosition() {
   return Math.floor(Math.random() * 100); 
}

function shiftPosition(ship) {
   const position = ship.coordinates[0];
   let newPosition = +position;
   newPosition = newPosition + 1;
   if (`${newPosition}`.length > 2) return normalizeCoordinates(`${newPosition}`.slice(1))
   return normalizeCoordinates(normalizeCoordinates(`${newPosition}`));

}
export { randomPosition, shiftPosition };