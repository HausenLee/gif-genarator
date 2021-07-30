import TheElement from './ele'

export default class CImage extends TheElement {
    constructor(data) {
        super(data);
        this.src = data.src;
        this.base64 = '';
        this.width = this.height = 200;
        this.loadPromise = this.initBase64();
        this.loaded = false;
    }
    initBase64() {
        this.loaded = false;
        return new Promise((resolve,reject) => {
            const img = new Image();
            img.onload = () => {
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                this.context2d.drawImage(img, 0, 0, this.width, this.height);
                this.base64 =  this.canvas.toDataURL()
                resolve()
                this.loaded = true;
            }
            img.src = this.src;
        })
    }
    initShot() {
        
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