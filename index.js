import Field from "./Field.js";
import User from "./User.js";
import Computer from "./Computer.js";
import { calculateShipPositions } from "./positionHelpers.js";

const userField = new Field("user");
const compField = new Field("comp");

const user = new User("user", compField);
const comp = new Computer("computer", userField);

function isPlayerWin(member) {
  if (member.frags.length == 20) return true;
  return false;
}

function game(player = 'user') {
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
    if (isShoted) return;

    const target = event.target.dataset.comp;

    area.removeEventListener('click', shootHandler)

    position = user.shoot(target);
    if (position) {
      setTimeout(() => game(), 1000)
    } else {
      setTimeout(() => game('comp'), 1000)
    }
  }

  if (player == 'comp') {
    position = comp.shoot();
    if (position) {
      setTimeout(() => game('comp'), 1000)
    } else {
      setTimeout(() => game(), 1000)
    }
  }
}
// todo remove this listener in "play" button handler
document.getElementById('user').addEventListener('click', rotateHandler);

function rotateHandler(event) {
  const idx = event.target.dataset.user;
  for (let ship of userField.ships) {
    let positions = ship.coordinates.map((elem) => String(Object.keys(elem)))
    if (positions.includes(idx)) {
      const positions = ship.coordinates.map((elem) => Object.keys(elem));
      if (userField.rotate(ship)) {
        for (let i of positions) {
          if (i == positions[0]) continue;
          document.querySelector(`[data-user="${i}"]`).className = 'empty';
        }
      }
      return
    }
  }
}

// todo remove this listener in "play" button handler
document.getElementById('user').addEventListener('contextmenu', replaceHandler);

// todo
// oncontextmenu => get occupied positions
// remember ship coordinates
// get current ship margins and change className 'empty'
// exclude current ships.coordinates and margins from occupied
// add mouseover listener =>
// onmouseover => call isReplaceAvalible(ship, event.target) =>
// replace() states ship.coordinates depending on target =>
// => check isPositionAvalible (true or false) => change DOM
// if true && onclick call replace(ship, position)


// todo check event.target has ship else error
function replaceHandler(event) {
  event.preventDefault();
  let currentShip;
  const idx = event.target.dataset.user;

  for (let ship of userField.ships) {
    let positions = ship.coordinates.map((elem) => String(Object.keys(elem)))
    if (positions.includes(idx)) {
      currentShip = ship;
      if (userField.isReplaceAvalible(currentShip, idx)) {
        const positions = ship.coordinates.map((elem) => Object.keys(elem));
        for (let i of positions) {
          document.querySelector(`[data-user="${i}"]`).className = 'avalible';
        }
      }
    }
  }
  const cell = document.getElementById('user');
  cell.onmouseover = cell.onmouseout = replaceAvalibleHandler;
  // document.getElementById('user').addEventListener('mouseover', replaceHandler)

  function replaceAvalibleHandler(event) {
    const isTarget = Object.keys(event.target.dataset);
    if (isTarget != 'user') return;
    if (event.type == 'mouseover') {
      const position = event.target.dataset.user;
      let positions = calculateShipPositions(currentShip, position);
      positions = positions.map((item) => Object.keys(item));
      console.log('pos for paint', String(positions))
      positions.forEach((item) => {
        document.querySelector(`[data-user="${item}"]`).className = 'avalible';
      });
    }
    if (event.type == 'mouseout') {
      event.target.className = 'empty';
    }
    document.getElementById('user').addEventListener('click', remove);
    function remove() {
      cell.onmouseover = cell.onmouseout = () => { };

    }

  }

}


// game();
