import CElement from './ele'
import parseAPNG from 'apng-js';

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
        this.canvas = document.createElement("canvas");
        const context2d = this.canvas.getContext('2d');
        document.querySelector('.svgTest').appendChild(this.canvas);
        this.apng.getPlayer(context2d).then(player => {
            // 调用播放动画
            console.log(player);

            const timer = setInterval(() => {
                const base64 = this.canvas.toDataURL();
                this.shotBase64.push(base64);
                if(player.currentFrameNumber == this.duration - 1) {
                    clearInterval(timer);
                } else {
                    player.renderNextFrame();
                }
            }, 100);
            
        })
    }
    initShot() {
        this.loaded = false;
        return new Promise((resolve,reject) => {
            fetch(this.src)
            .then(respone => respone.blob())
            .then(blob => {
                return new Promise((resolveChild) => {
                    // Blob 转 ArrayBuffer
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(blob);
                    reader.onload = function() {
                      resolveChild(reader.result)
                    }
                })
            }).then(buffer => {
                this.apng = parseAPNG(buffer);
                
                this.durationTime = this.apng.playTime;
                this.duration = this.apng.frames.length;
                this.speed = this.durationTime / this.duration;
                this.initBase64();
                resolve();
                this.loaded = true;
            })
            .catch(err => {
                console.error(err);
                reject();
            });
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