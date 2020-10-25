
import { normalizeCoordinates, attrToCoord } from './transformCoordinates.js'

// getMargins(position, 'all') 'line', 'diagonal'

function getLineMaggins(position) {
    let set = new Set();
    position = +position;
    const { x, y } = attrToCoord(normalizeCoordinates(position));
    if (x + 1 < 10 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${position - 1}`));
      set.add(normalizeCoordinates(`${position + 10}`));
    }
    if (x + 1 < 10 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${position + 10}`));
      set.add(normalizeCoordinates(`${position + 1}`));
    }
    if (x - 1 >= 0 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${position + 1}`));
      set.add(normalizeCoordinates(`${position - 10}`));
    }
    if (x - 1 >= 0 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${position - 10}`));
      set.add(normalizeCoordinates(`${position - 1}`));
    }
    return Array.from(set);
  }

  function getDiagonalMargins(position) {
    let set = new Set();
    position = +position;
    const { x, y } = attrToCoord(normalizeCoordinates(position));
    if (x + 1 < 10 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${position + 9}`));
    }
    if (x + 1 < 10 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${position + 11}`));
    }
    if (x - 1 >= 0 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${position - 9}`));
    }
    if (x - 1 >= 0 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${position - 11}`));
    }
    return Array.from(set);
  }

  export {
      getDiagonalMargins,
      getLineMaggins
  }