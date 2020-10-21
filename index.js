import Field from './Field.js';
import User from './User.js';
import Computer from './Computer.js';
import { randomPosition } from './positionHelpers.js';
const userField = new Field('user');

// const compField = new Field('comp');

const user = new User('user', userField);

// const comp = new Computer('samsung', userField);

function isPlayerWin(player) {
  if (player.frags.length == 20) return true;
  return false;
}

document.getElementById('user').addEventListener('click', shootingHandler);
function shootingHandler() {
  return (event) => {
    const target = event.target.dataset.user;
    user.shoot(target);
    // document.getElementById('comp').removeEventListener('click', shoot);
  }
}

const shootingTurn = (user, comp) => {
  let position = '';
  // let player = +Math.random() >= 0.5;
  const members = ['user', 'comp'];
    if (members[0] == 'user') {
      document.getElementById('comp').addEventListener('click', shootingHandler);
      function shootingHandler() {
        return (event) => {
          const target = event.target.dataset.comp;
          position = user.shoot(target);
          document.getElementById('user').removeEventListener('click', shoot);
        }
      }
    }
    // if (members[player] == comp) {
    //   position = randomPosition();
    //   position = comp.shoot(position);
    // }
    // if (!position) {
    //   let idx = members.findIndex(elem => elem == player);
    //   player = Math.abs((idx + 1) - 2);
    // }
    // // if (isPlayerWin(members[player])) return members[player].name + 'win';
    // setTimeout(shootingTurn, 1000)
}

// shootingTurn(user, comp)