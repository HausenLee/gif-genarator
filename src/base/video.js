import TheElement from './ele'

export default class CImage extends TheElement {
    constructor(data) {
        super(data);
        this.src = data.src;
        this.base64 = '';
        this.width = this.height = 200
        const video = document.createElement('video');
        video.setAttribute('src', this.src);
        video.setAttribute('muted', true);
        video.setAttribute('autoplay', true);
        video.setAttribute('loop', true);

        this.ele = video;
        this.eleXML = new XMLSerializer().serializeToString(video);

        this.base64Canvas = document.createElement("canvas");
        this.base64Context2d = this.base64Canvas.getContext('2d'); 

        this.loadVideo();
        this.dirty = false;
    }
    loadVideo() {
        const div = document.createElement('div');
        div.className="tmp"
        div.id="tmp"
        div.appendChild(this.ele)
        document.documentElement.appendChild(div);

        this.ele.addEventListener('loadeddata', () => {
            this.duration = this.ele.duration * 1000;
            const w = this.ele.videoWidth * 0.16;
            const h = this.ele.videoHeight * 0.16;
            this.width = this.ele.width = w;
            this.height = this.ele.height = h;
            this.base64Canvas.width = this.width;
            this.base64Canvas.height = this.height;
            this.dirty = true;
            // this.test1();
        });
    }
    initBase64(timer) {
        const video = this.ele;
        // video的currentTime 单位是s，传进来的timer单位是ms
        video.currentTime = timer / 1000;
        
        this.base64Context2d.clearRect(0,0, this.width, this.height);
        this.base64Context2d.drawImage(video, 0, 0, this.width, this.height); 
        const dataURL = this.base64Canvas.toDataURL('image/jpeg');
        // this.base64 = dataURL;
        
        // this.showTest(dataURL)
        return dataURL;
    }
    test1() {
        let count = 0;
        const timer = setInterval(() => {
            count += 33;
            if(count < this.duration) {
                this.initBase64(count);
            } else {
                clearInterval(timer)
            }
        }, 300);
    }
    showTest(src) {
        const tmpImage = document.createElement('img');
        tmpImage.src = src;
        document.querySelector('.svgTest').appendChild(tmpImage);
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