import transformCoordinated from './transformCoordinates.js'

function randomPosition() {
   return transformCoordinated.idToAttr(Math.floor(Math.random() * 100)); 
}
export default randomPosition;