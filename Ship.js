import { normalizeCoordinates } from './transformCoordinates.js'
export default class Ship {

  constructor(owner, startCoordinate, deckSize, direction = 'vertical') {
    this.owner = owner;
    this.coordinates = this._coordinates(startCoordinate, deckSize, direction);
    this.direction = direction;
  }
  // getCoordinates(coordinates) {}
  //setCoordinates(coordinates) {}

  _coordinates = (position, deckSize, direction) => {
    let coordinates = [{ [normalizeCoordinates(position)]: 'safe' }];
    let index = direction === 'vertical' ? 1 : 10;
    for (let i = 1; i < deckSize; i++) {
      position = position + index;
      if (position > 99) position = position - 100;
      coordinates.push({ [normalizeCoordinates(position)]: 'safe' })
    }
    return coordinates;
  };
}

