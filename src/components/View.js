export default class View {
    constructor(view) {
        this.view = view();
    }

    mount = (elem) => {
        const element = document.getElementById(elem);
        element.append(this.view);
    }

    remove = () => {
        const elem = this.view;
        elem.remove();
    }
}
