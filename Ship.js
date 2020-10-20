import { normalizeCoordinates } from './transformCoordinates.js'
export default class Ship {

  constructor(startCoordinate, deckSize, direction='up') {
    this.coordinates = this.getCoordinates(startCoordinate, deckSize, direction);
    this.direction = direction;
  }
    getCoordinates = (position, deckSize, direction) => {
      let coordinates = [normalizeCoordinates(position)];
      let index = direction === 'up' ? 1 : direction === 'down' ? -1 : direction === 'left' ? 10 : -10;
      for (let i = 1; i < deckSize; i++) {
        position = position + index;
        coordinates.push(normalizeCoordinates(position))
      }
        return coordinates;
    };
}

