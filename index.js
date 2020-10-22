import Field from "./Field.js";
import User from "./User.js";
import Computer from "./Computer.js";
import { randomPosition } from "./positionHelpers.js";
import { normalizeCoordinates } from "./transformCoordinates.js";

const userField = new Field("user");
const compField = new Field("comp");

const user = new User("user", compField);
const comp = new Computer("computer", userField);
function isPlayerWin(member) {
  if (member.frags.length == 20) return true;
  return false;
}


function game(player='user') {
  let position = null;
  const area = document.getElementById('comp');
  const member = player == 'user' ? user : comp;

  if (isPlayerWin(member)) {
    return alert(member.name + " win");
  }

  if (player == 'user') {
    area.addEventListener('click', shootHandler)
  }
  function shootHandler(event) {
    // check target 
    const isTarget = Object.keys(event.target.dataset);
    if (isTarget != 'comp') return;

    // check has target allready shooted
    const elem = event.target;
    const attr = elem.classList;
    const arr = Array.from(attr);
    const isShoted = arr.includes('shoted');
    if(isShoted) return;

    const target = event.target.dataset.comp;

    area.removeEventListener('click', shootHandler)

    position = user.shoot(target);
    if (position) {
      setTimeout(() => game(), 1000)
    } else {
      setTimeout(() => game('comp'), 1000)
    }
  }

  if(player == 'comp') {
    position = comp.shoot();
    if (position) {
      setTimeout(() => game('comp'), 1000)
    } else {
      setTimeout(() => game(), 1000)
    }
  }
}

document.getElementById('user').addEventListener('click', rotateHandler);

function rotateHandler(event) {
  const idx = event.target.dataset.user;
  for (let ship of userField.ships) {
    let positions = ship.coordinates.map((elem) => String(Object.keys(elem)))
    if (positions.includes(idx)) {
      const positions = ship.coordinates.map((elem) => Object.keys(elem));
      for (let i of positions) {
        document.querySelector(`[data-user="${i}"]`).className = 'empty';
      }
      userField.rotate(ship);
      return
    }
  }
} 




// game();
