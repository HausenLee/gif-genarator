import TheElement from './ele'
import Template from './index'

export default class CImage extends TheElement {
    constructor(data) {
        super(data);
        this.src = data.src;
        this.base64 = '';
        this.width = this.height = 200
        this.shotBase64 = [];

        const video = document.createElement('video');
        video.setAttribute('src', this.src);
        video.setAttribute('muted', true);
        video.setAttribute('autoplay', true);
        video.setAttribute('loop', true);

        this.ele = video;
        this.eleXML = new XMLSerializer().serializeToString(video);

        this.base64Canvas = document.createElement("canvas");
        this.base64Context2d = this.base64Canvas.getContext('2d'); 

        this.loadPromise = this.loadVideo();
        this.loaded = false;
        this.dirty = false;
    }
    loadVideo() {
        return new Promise((resolve,reject) => {
            const div = document.createElement('div');
            div.className="tmp"
            div.id="tmp"
            div.appendChild(this.ele)
            document.documentElement.appendChild(div);
            this.loaded = false;

            this.ele.addEventListener('loadeddata', () => {
                this.speed = 1000 / 10;
                this.durationTime = this.ele.duration * 1000;
                this.duration = ~~(this.durationTime / this.speed);
                
                const w = this.ele.videoWidth * 0.16;
                const h = this.ele.videoHeight * 0.16;
                this.width = this.ele.width = w;
                this.height = this.ele.height = h;
                this.base64Canvas.width = this.width;
                this.base64Canvas.height = this.height;
                this.dirty = true;
                this.ele.currentTime = 0;
                this.shotBase64 = [];
                this.initBase64();
            });
            this.ele.addEventListener('seeked',() => {
                if(this.ele.currentTime < this.durationTime / 1000) {
                    this.initBase64();
                } else {
                    console.log('video shot done');
                    this.loaded = true;
                    resolve();
                }
            })
        })
    }
    initBase64() {
        console.log(this.ele.currentTime);
        this.base64Context2d.clearRect(0,0, this.width, this.height);
        this.base64Context2d.drawImage(this.ele, 0, 0, this.width, this.height); 
        const dataURL = this.base64Canvas.toDataURL('image/jpeg');
        this.shotBase64.push(dataURL);
        this.ele.currentTime += this.speed / 1000;
    }
    toSvg(isAll = true,isDownload) {
        const src = this.src;
        return isDownload ? `<g transform="translate(${this.left},${this.top})">
                <image xlink:href="${src}" width="${this.width}" height="${this.height}"/>
            </g>` : `
            <video xmlns="http://www.w3.org/1999/xhtml" src="${this.src}" width="${this.width}" height="${this.height}" muted="true" autoplay="true" loop="true"></video>
            ` ;
    }
}