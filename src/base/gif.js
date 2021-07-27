import CElement from './ele'
import SuperGif from '../utils/libgif'
export default class CGif extends CElement {
    constructor(data) {
        super(data);
        this.src = data.src;
        this.base64 = '';
        this.shotBase64 = [];
        this.width = this.height = 200

    }
    initBase64() {
        return new Promise((resolve,reject) => {
            fetch(this.src)
            .then(respone => respone.blob())
            .then(blob => {
                let reader = new FileReader(); 
                reader.onloadend = () => {
                    this.base64 = reader.result;
                    this.initShot().then(res => {
                        resolve();
                    })
                };
                reader.readAsDataURL(blob);
            })
            .catch(err => {
                console.error(err);
                reject();
            });
        })
    }
    initShot() {
        return new Promise((resolve,reject) => {
            const gifImg = document.createElement('img');
            gifImg.setAttribute('rel:animated_src', this.src);
            gifImg.setAttribute('rel:auto_play', '0');
            document.body.appendChild(gifImg);
            const gifRub = new SuperGif({ gif: gifImg });
            
            gifRub.load(async() => {
                console.log(gifRub.get_duration_ms(),gifRub.get_length(),this.src)
                this.canvas = gifRub.get_canvas();
                this.gifRub = gifRub;
                resolve()
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