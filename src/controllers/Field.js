import transformCoordinates from './transformCoordinates.js';

export default class Field {
  constructor(size) {
    this.size = size;
    this.square = size * size;
  }
  build() {
    const field = document.createElement('div');
    field.id = 'userField';
    root.append(field);
      field.style.cssText = `
        margin: 0 30% 0 30%; 
        display: grid; 
        grid-template-rows: repeat(${this.size}, 30px); 
        grid-template-columns: repeat(${this.size}, 30px);`;

    for (let i = 0; i < this.square; i++) {
      const div = document.createElement("div");
      div.className = "empty";
      if (i == 47) div.className = "ship";
      div.id = transformCoordinates.idToAttr(i);
      div.innerHTML = transformCoordinates.idToAttr(i);
      field.append(div);
    }
  }
}
