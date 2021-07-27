import TheElement from './ele'

export default class CImage extends TheElement {
    constructor(data) {
        super(data);
        this.src = data.src;
        this.base64 = '';
        this.width = this.height = 200
    }
    initBase64() {
        return new Promise((resolve,reject) => {
            const img = new Image();
            img.onload = () => {
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                this.context2d.drawImage(img, 0, 0, this.width, this.height);
                this.base64 =  this.canvas.toDataURL()
                this.initShot().then(res => {
                    resolve();
                })
            }
            img.src = this.src;
        })
    }
    initShot() {
        return new Promise((resolve,reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const context2d = canvas.getContext('2d');
                canvas.width = 200;
                canvas.height = 200;
                context2d.drawImage(img,0,0,canvas.width,canvas.height);

                this.canvas = canvas;
                resolve();
            }
            img.src = this.base64;
        })
    }
    toSvg(isAll = true,isDownload) {
        const src = isDownload? this.base64 : this.src;
        return isDownload ? `
            <g transform="translate(${this.left},${this.top})">
                <image xlink:href="${src}" width="${this.width}" height="${this.height}"/>
            </g>
        ` : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this.width} ${this.height}" width="${this.width}" height="${this.height}">
                <g>
                    <image xlink:href="${src}" width="${this.width}" height="${this.height}"/>
                </g>
            </svg>`;
    }
}