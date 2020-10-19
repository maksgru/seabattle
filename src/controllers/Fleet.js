import { normalizeCoordinates } from './transformCoordinates.js';
export default class Fleet {

  constructor(startCoordinate, deckSize, direction='up') {
    this.data = {
      decks: [] /*{ 12: 'ok'}, {13: 'injured'}*/
    };
    this.ship(startCoordinate, deckSize, direction);

  }
    ship = (position, deckSize, direction) => {
        return {
            position: position,
            deckSize: deckSize,
            direction: direction
        }
    }
}

// name - position + decksize + direction