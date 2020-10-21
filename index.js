import Field from "./Field.js";
import User from "./User.js";
import { randomPosition } from "./positionHelpers.js";
import { normalizeCoordinates } from "./transformCoordinates.js";

const userField = new Field("user");
const compField = new Field("comp");

const user = new User("user", compField);
const comp = new User("samsung", userField);

function isPlayerWin(player) {
  if (player.frags.length == 20) return true;
  return false;
}


function game(player='user', prevPosition) {
  let position = null;
  const area = document.getElementById('comp');
  // player = palyers[0];
  // if (isPlayerWin(player)) {
  //   return alert(player, "win");
  // }
  if (player == 'user') {
    area.addEventListener('click', shootHandler)
  }
  function shootHandler(event) {
    // check has target allready shooted
    const target = event.target.dataset.comp;
    area.removeEventListener('click', shootHandler)
    position = user.shoot(target);
    if (position) {
    console.log('user target is',position)

      setTimeout(() => game(), 1000)
    } else {
      setTimeout(() => game('comp'), 1000)
    }
  }
  if(player == 'comp') {
    let pos = normalizeCoordinates(randomPosition())
    position = comp.shoot(pos);
    console.log('target is',position)
    if (position) {
      prevPosition = position;
      setTimeout(() => game('comp'), 1000)
    } else {
      setTimeout(() => game(), 1000)
    }
  }
}

game();
