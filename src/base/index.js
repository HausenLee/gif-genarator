import CGif from "./gif";
import CImage from "./images";
import CText from "./text";
import Utils from '../utils/index'
class CTemplate {
    constructor(data) {
        this.width = 600;
        this.height = 600;
        this.elementsData = [
            {
                type: 'ctext',
                content: '添加Gif文本1',
                top: 20,
                left: 20,
            },{
                type: 'ctext',
                content: '这里是Gif文本2',
                top: 20,
                left: 300,
            },{
                type: 'cimage',
                src: 'imgs/img1.jpg',
                top: 60,
                left: 20,
            },{
                type: 'cimage',
                src: 'imgs/img2.jpg',
                top: 60,
                left: 300,
            },{
                type: 'cgif',
                src: 'imgs/gif1.gif',
                top: 280,
                left: 20,
            },{
                type: 'cgif',
                src: 'imgs/gif2.gif',
                top: 220,
                left: 300,
            },{
                type: 'cgif',
                src: 'imgs/gif3.gif',
                top: 400,
                left: 300,
            }
        ]
        this.elements = this.elementsData.map(item => {
            switch(item.type) {
                case 'ctext' :
                    return new CText(item);
                case 'cimage' :
                    return new CImage(item);
                case 'cgif' :
                    return new CGif(item);
            }
        })
        this.fps = 30;
        this.gifWidth = this.width;
        this.gifHeight = this.height;
    }
    toSvg(isDownload) {
        let eleSvg = ''

        this.elements.forEach(item => {
            eleSvg += item.toSvg(false,isDownload);
        })
        return `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this.width} ${this.height}" width="${this.width}" height="${this.height}">
                <g transform="translate(0,0)">
                    <rect x="0" y="0" height="${this.height}" width="${this.width}" style="fill: rgba(0,0,0,0)" />
                </g>
                ${eleSvg}
            </svg>
        `
    }
    getShot() {
        const gifElements = Utils.filterElements(this.elements, 'cgif');
        const DOMURL = window.URL || window.webkitURL || window;
    
        const maxTime = this.getMaxTime(gifElements);
        const delta = 1000 / this.fps;
        let count = 0;
        let pageShots = [];
        let svgBlob = '',svgBlobUrl = '';
        
        gifElements.forEach(item => {
            item.gifRub.play();
        })
        return new Promise((resolve,reject) => {
            const timer = setInterval(() => {
                if(count <= maxTime) {
                    let svgStr = this.toSvg(true)
                    gifElements.forEach(item => {
                        const shot = item.canvas.toDataURL();
                        svgStr = svgStr.replace(item.src,shot);
                    })
                    svgBlob = new Blob([svgStr], {type: "image/svg+xml"});
                    svgBlobUrl = DOMURL.createObjectURL(svgBlob);
                    pageShots.push(svgBlobUrl);
                } else {
                    clearInterval(timer);
                    resolve(pageShots);
                }
                count += delta;
    
            }, delta);
        })
    }
    getMaxTime(gifele) {
        const times = gifele.map(item => {
            return item.gifRub.get_duration_ms();
        });

        return Math.max(...times)
    }
    generateGif() {
        const promiseList = [];
        const imageElements = Utils.filterElements(this.elements, 'cimage');
        const gifElements = Utils.filterElements(this.elements, 'cgif');
        
        imageElements.forEach(item => {
            promiseList.push(item.initBase64());
        })

        gifElements.forEach(item => {
            promiseList.push(item.initShot());
        })

        return new Promise((resolcve,reject) => {
            Promise.all(promiseList).then((res) => {
                this.getShot().then(rt => {
                    this.pageShots = rt;
                    resolcve();
                })
            })
        })
    }
    download() {
        const images = this.pageShots;
        const interval = 1 / this.fps;
        const gifWidth = this.gifWidth;
        const gifHeight = this.gifHeight;

        return new Promise((resolcve,reject) => {
            window.gifshot.createGIF({
                gifWidth,
                gifHeight,
                images,
                interval,
            }, (obj) => {
                if (!obj.error) {
                    const $a = document.createElement('a');
                    $a.setAttribute('href', obj.image);
                    $a.setAttribute( 'download', '凡科快图.gif' );
                    document.documentElement.appendChild($a);
                    $a.click();
                    document.documentElement.removeChild($a);
                    resolcve();
                }
            });
        });
        
    }
}

export default new CTemplate();