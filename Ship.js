import { normalizeCoordinates } from './transformCoordinates.js'
export default class Ship {

  constructor(owner, startCoordinate, deckSize, direction = 'vertical') {
    this.owner = owner;
    this.coordinates = this.getCoordinates(startCoordinate, deckSize, direction);
    this.direction = direction;
  }
  getCoordinates = (position, deckSize, direction) => {
    let coordinates = [{ [position]: 'safe' }];
    let index = direction === 'vertical' ? 1 : 10;
    for (let i = 1; i < deckSize; i++) {
      position = position + index;
      if (position > 99) position = position - 100;
      coordinates.push({ [position]: 'safe' })
    }
    return coordinates;
  };
}

