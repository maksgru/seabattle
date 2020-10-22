
import { normalizeCoordinates, attrToCoord } from './transformCoordinates.js'

function getLineMaggins(target) {
    let set = new Set();
    target = +target;
    const { x, y } = attrToCoord(normalizeCoordinates(target));
    if (x + 1 < 10 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${target - 1}`));
      set.add(normalizeCoordinates(`${target + 10}`));
    }
    if (x + 1 < 10 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${target + 10}`));
      set.add(normalizeCoordinates(`${target + 1}`));
    }
    if (x - 1 >= 0 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${target + 1}`));
      set.add(normalizeCoordinates(`${target - 10}`));
    }
    if (x - 1 >= 0 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${target - 10}`));
      set.add(normalizeCoordinates(`${target - 1}`));
    }
    return Array.from(set);
  }

  function getDiagonalMargins(target) {
    let set = new Set();
    target = +target;
    const { x, y } = attrToCoord(normalizeCoordinates(target));
    if (x + 1 < 10 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${target + 9}`));
    }
    if (x + 1 < 10 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${target + 11}`));
    }
    if (x - 1 >= 0 && y + 1 < 10) {
      set.add(normalizeCoordinates(`${target - 9}`));
    }
    if (x - 1 >= 0 && y - 1 >= 0) {
      set.add(normalizeCoordinates(`${target - 11}`));
    }
    return Array.from(set);
  }

  export {
      getDiagonalMargins,
      getLineMaggins
  }