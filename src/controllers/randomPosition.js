import { normalizeCoordinates } from './transformCoordinates.js'

function randomPosition() {
   return normalizeCoordinates(Math.floor(Math.random() * 100)); 
}

function shiftPosition(position) {
   let newPosition = +position;
   newPosition = newPosition + 1;
   if (`${newPosition}`.length > 2) return normalizeCoordinates(`${newPosition}`.slice(1))
   return normalizeCoordinates(normalizeCoordinates(`${newPosition}`));

}
export { randomPosition, shiftPosition };