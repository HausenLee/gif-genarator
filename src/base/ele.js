export default class CElement {
    constructor(data) {
        this.canvas = document.createElement('canvas')
        this.context2d = this.canvas.getContext('2d');
        this.type = data.type;
        this.top = data.top;
        this.left = data.left;
    }
}