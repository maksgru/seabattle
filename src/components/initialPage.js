
function initialPage() {
    const panel = document.createElement('div');
    const parAuto = document.createElement('p');
    const parHandle = document.createElement('p');

    const spanAuto = document.createElement('span');
    spanAuto.innerHTML = 'Auto Ship Placing'

    const spanHandle = document.createElement('span');
    spanHandle.innerHTML = 'Handle Ship Placing'

    const inputAuto = document.createElement('input');
    inputAuto.type = 'radio';
    inputAuto.name = 'shipSpread';
    inputAuto.value = 'auto';
    inputAuto.id = 'inputAuto';
    inputAuto.checked = 'true';

    const inputHandle = document.createElement('input');
    inputHandle.type = 'radio';
    inputHandle.name = 'shipSpread';
    inputHandle.value = 'handle';

    const inputEnter = document.createElement('input');
    inputEnter.type = 'button';
    inputEnter.value = 'Start Game';
    inputEnter.id = 'startGame'

    parAuto.append(inputAuto);
    parAuto.append(spanAuto);

    parHandle.append(inputHandle);
    parHandle.append(spanHandle);

    panel.append(parAuto);
    panel.append(parHandle);
    panel.append(inputEnter);
    return panel;
}

export default initialPage;