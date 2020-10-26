import Field from "./Field.js";
import User from "./User.js";
import Computer from "./Computer.js";
import { calculateShipPositions, getOccupiedPositions, getShipMargins } from "./positionHelpers.js";
import { isPositionAvalible } from "./checks.js";
import { normalizeCoordinates } from "./transformCoordinates.js";

const userField = new Field("user");
const compField = new Field("comp");

const user = new User("user", compField);
const comp = new Computer("computer", userField);

function isPlayerWin(member) {
   return member.frags.length == 20;
}

function finishGame(winnerName) {
  const message = document.createElement('h3');
  message.innerHTML = `${winnerName} WIN! ! !`;
  const newGameBtn = document.createElement('button');
  newGameBtn.innerHTML = 'START NEW GAME';
  document.body.append(message);
  document.body.append(newGameBtn);
  newGameBtn.onclick = () => document.location.reload();
} 

function game(player = "user") {
  let position = null;
  const area = document.getElementById("comp");
  const member = player == "user" ? user : comp;

  if (isPlayerWin(member)) {
    return finishGame(member.name);
  }

  if (player == "user") {
    area.addEventListener("click", shootHandler);
  }
  function shootHandler(event) {
    // check target
    const isTarget = Object.keys(event.target.dataset);
    if (isTarget != "comp") return;

    // check has target allready shooted
    const elem = event.target;
    const attr = elem.classList;
    const arr = Array.from(attr);
    const isShoted = arr.includes("shoted");
    if (isShoted) return;

    const target = event.target.dataset.comp;

    area.removeEventListener("click", shootHandler);

    position = user.shoot(target);
    if (position) {
      setTimeout(() => game(), 1000);
    } else {
      setTimeout(() => game("comp"), 1000);
    }
  }

  if (player == "comp") {
    position = comp.shoot();
    if (position) {
      setTimeout(() => game("comp"), 1000);
    } else {
      setTimeout(() => game(), 1000);
    }
  }
}
// todo remove this listener in "play" button handler
document.getElementById("user").addEventListener("click", rotateHandler);

function rotateHandler(event) {
  const idx = event.target.dataset.user;
  for (let ship of userField.ships) {
    let positions = ship.coordinates.map((elem) => String(Object.keys(elem)));
    if (positions.includes(idx)) {
      const positions = ship.coordinates.map((elem) => Object.keys(elem));
      console.log(positions)
      if (userField.rotate(ship)) {
        for (let i of positions) {
          i = normalizeCoordinates(i);
          if (i == positions[0]) continue;
          document.querySelector(`[data-user="${i}"]`).className = "empty";
        }
      }
      return;
    }
  }
}

// todo remove this listener in "play" button handler
document.getElementById("user").addEventListener("contextmenu", replaceHandler);

function replaceHandler(event) {
  document.getElementById('user').removeEventListener('click', rotateHandler);
  document.getElementById("user").removeEventListener("contextmenu", replaceHandler);
  event.preventDefault();
  const target = event.target.dataset.user;
  let occupiedPositions = getOccupiedPositions(userField.ships);
  console.log('occup', occupiedPositions);
  console.log('targ', target)
  if (!occupiedPositions.includes(String(target))) {
    console.log('oocup', occupiedPositions);
    console.log('target'. target)
    return
  };
  for (let ship of userField.ships) {
    let shipPositons = ship.coordinates.map((item) => normalizeCoordinates(String(Object.keys(item))));
    console.log('ship pos', shipPositons)
    if (shipPositons.includes(target)) {
      console.log('ship', ship)
      userField.removedShip = ship;
      const idx = userField.ships.indexOf(ship);
      userField.ships.splice(idx, 1);
      break;
    }

  }


  console.log(userField.removedShip)
  const positions = userField.removedShip.coordinates.map((item) => normalizeCoordinates(String(Object.keys(item))));
  positions.forEach((item) => {
    document.querySelector(`[data-user="${item}"]`).className = 'avalible';
  });
  const cell = document.getElementById("user");
  cell.onmouseover = cell.onmouseout = replaceAvalibleHandler;
}

function replaceAvalibleHandler(event) {
  const isTarget = Object.keys(event.target.dataset);
  if (isTarget != "user") return;
  const occupiedPositions = getOccupiedPositions(userField.ships);
  if (event.type == "mouseover") {
    const target = event.target.dataset.user;
    const newCoordinates = calculateShipPositions(userField.removedShip, target);
    userField.removedShip.coordinates = newCoordinates;
    if (!isPositionAvalible(userField.removedShip, occupiedPositions)) {
      console.log('unavalible to set');
      document.querySelector(`[data-user="${target}"]`).className = 'unavalible';
      return
    }
    const positions = userField.removedShip.coordinates.map((item) => String(Object.keys(item)));
    positions.forEach((item) => {
      document.querySelector(`[data-user="${item}"]`).className = 'avalible';
    });
    document.getElementById("user").addEventListener('click', establishHandler);
  }

  if (event.type == "mouseout") {
    for (let i = 0; i < 100; i++) {
      let idx = normalizeCoordinates(i);
      if (occupiedPositions.includes(idx)) {
        document.querySelector(`[data-user="${idx}"]`).className = "ship";
        continue
      }
      document.querySelector(`[data-user="${idx}"]`).className = "empty";
    }

  }
}

function establishHandler(event) {
  const isTarget = Object.keys(event.target.dataset);
  if (isTarget != "user") return;
  const target = event.target.dataset.user;
  const occupiedPositions = getOccupiedPositions(userField.ships);
  const newCoordinates = calculateShipPositions(userField.removedShip, target);
  userField.removedShip.coordinates = newCoordinates;
  if (!isPositionAvalible(userField.removedShip, occupiedPositions)) {
    console.log('unavalible to establish');
    document.querySelector(`[data-user="${target}"]`).className = 'unavalible';
    document.getElementById("user").removeEventListener('click', establishHandler);
    return
  }
  const positions = userField.removedShip.coordinates.map((item) => String(Object.keys(item)));
  positions.forEach((item) => {
    document.querySelector(`[data-user="${item}"]`).className = 'ship';
  });
  userField.ships.push(userField.removedShip);
  userField.removedShip = null;
  const cell = document.getElementById("user");
  document.getElementById("user").removeEventListener('click', establishHandler);
  document.getElementById("user").addEventListener("click", rotateHandler);
  document.getElementById("user").addEventListener("contextmenu", replaceHandler);

  cell.onmouseover = cell.onmouseout = () => { };
}


const startButton = document.createElement('button');
startButton.innerHTML = 'START GAME';

startButton.onclick = () => {
  document.getElementById("user").removeEventListener('click', establishHandler);
  document.getElementById("user").removeEventListener("click", rotateHandler);
  document.getElementById("user").removeEventListener("contextmenu", replaceHandler);
  game();
  startButton.remove();

}

document.body.append(startButton);


