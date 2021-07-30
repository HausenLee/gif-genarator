import CElement from './ele'
import SuperGif from '../utils/libgif'
export default class CGif extends CElement {
    constructor(data) {
        super(data);
        this.src = data.src;
        this.base64 = '';
        this.shotBase64 = [];
        this.width = this.height = 200
        this.loadPromise = this.initShot();
        this.loaded = false;
    }
    initBase64() {
        const len = this.duration;
        console.log(len)
        for(let i = 0; i < len; i++ ){
            this.gifRub.move_to(i);
            const base64 = this.gifRub.get_canvas().toDataURL();
            this.shotBase64.push(base64);
        }
    }
    initShot() {
        this.loaded = false;
        return new Promise((resolve,reject) => {
            const gifImg = document.createElement('img');
            gifImg.setAttribute('rel:animated_src', this.src);
            gifImg.setAttribute('rel:auto_play', '0');
            document.body.appendChild(gifImg);
            const gifRub = new SuperGif({ gif: gifImg });
            gifRub.load(async() => {
                console.log(gifRub.get_duration_ms(),gifRub.get_length(),this.src)
                this.gifRub = gifRub;
                this.duration = gifRub.get_length();
                this.durationTime = gifRub.get_duration_ms();
                this.speed = this.durationTime / this.duration;
                this.initBase64();
                resolve()
                this.loaded = true;
            })
        })
    }
    
    toSvg(isAll = true,isDownload) {
        const src = this.src;
        return isDownload ? `
            <g transform="translate(${this.left},${this.top})">
                <image xlink:href="${src}" width="200" height="200"/>
            </g>
        ` : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this.width} ${this.height}" width="${this.width}" height="${this.height}">
                <g>
                    <image xlink:href="${src}" width="200" height="200"/>
                </g>
            </svg>`;
    }
}