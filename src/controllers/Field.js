export default class Field {
  constructor(size) {
    this.size = size;
    this.square = size * size;
  }
  build() {
      root.style.cssText = `
        margin: 0 30% 30% 0; 
        display: grid; 
        grid-template-rows: repeat(${this.size}, 50px); 
        grid-template-columns: repeat(${this.size}, 50px);`;

    for (let i = 0; i < this.square; i++) {
      const div = document.createElement("div");
      div.className = "cell";
      div.id = `${i}`;
      root.append(div);
      console.log(div.id)
    }
  }
}
