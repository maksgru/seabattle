"use strict";
// [  [type, state],[type, state] ]

// function handler(event) {
//     const cell = document.getElementById(event.target.id);
//     cell.classList.add('ship');
// }
for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    div.className = 'cell';
    div.id = `${i}`;
    field.append(div);
}

oneCellShip.addEventListener('click', () => makeShip());


// makeShip shoud get type of ship
// inside the makeSip determine count and kind of ships depending on shipType
function makeShip() {
    const cell = document.getElementById('field');
    cell.onmouseover = (e) => {
        let target = e.target;
        target.classList.add('killed');
    }
    cell.onclick = function (event) {
        let target = event.target;
        target.classList.add('ship');
    }

    return;
}
