import CGif from "./gif";
import CImage from "./images";
import CText from "./text";
import CVideo from "./video";
import config from "./config";
import Utils from '../utils/index'
class CTemplate {
    constructor(data) {
        this.width = 600;
        this.height = 600;
        this.fps = 30;
        this.gifWidth = this.width;
        this.gifHeight = this.height;

        this.changeTemplateType();
    }
    changeTemplateType(type) {
        this.elementsData = config.templateData
        this.elements = this.elementsData.map(item => {
            switch(item.type) {
                case 'ctext' :
                    return new CText(item);
                case 'cimage' :
                    return new CImage(item);
                case 'cgif' :
                    return new CGif(item);
                case 'cvideo' :
                        return new CVideo(item);
            }
        })
    }   
    toSvg(isDownload) {
        let eleSvg = ''

        this.elements.forEach(item => {
            eleSvg += item.toSvg(false,isDownload);
        })
        return isDownload ? `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this.width} ${this.height}" width="${this.width}" height="${this.height}">
                <g transform="translate(0,0)">
                    <rect x="0" y="0" height="${this.height}" width="${this.width}" style="fill: rgba(0,0,0,0)" />
                </g>
                ${eleSvg}
            </svg>
        `: ``
    }
    getShot() {
        const gifElements = Utils.filterElements(this.elements, 'cgif');
        const DOMURL = window.URL || window.webkitURL || window;
    
        const maxTime = this.getMaxTime();
        const fps = 1000 / this.fps;
        
        let count = 0;
        let pageShots = [];
        let svgBlob = '',svgBlobUrl = '';
        gifElements.forEach(item => {
            item.gifRub.play();
        })

        return new Promise((resolve,reject) => {
            let shot ='';
            let now = Date.now();
            const fn = () => {
                
                if(Date.now() - now >= fps) {
                    now = Date.now();
                    if(count <= maxTime) {
                        let svgStr = this.toSvg(true)
                        this.elements.forEach(item => {
                            if(['ctext','cimage'].includes(item.type)) {
                                return;
                            } else if('cgif' == item.type) {
                                shot = item.canvas.toDataURL();
                            } else if('cvideo' == item.type) {
                                shot = item.initBase64(count);
                            }
                            svgStr = svgStr.replace(item.src,shot);
                        })
                        svgBlob = new Blob([svgStr], {type: "image/svg+xml"});
                        svgBlobUrl = DOMURL.createObjectURL(svgBlob);
                        pageShots.push(svgBlobUrl);
                    } else {
                        cancelAnimationFrame(timer);
                        resolve(pageShots);
                    }
                    count += fps;
                }

                requestAnimationFrame(fn)
            }

            const timer = requestAnimationFrame(fn);
        })
    }
    getMaxTime() {
        const times = this.elements.map(item => {
            if(['ctext','cimage'].includes(item.type)) {
                return 0
            } else if('cgif' == item.type) {
                return item.gifRub.get_duration_ms();
            } else if('cvideo' == item.type) {
                return item.duration;
            }
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
        console.log(interval);
        const gifWidth = this.gifWidth;
        const gifHeight = this.gifHeight;

        return new Promise((resolcve,reject) => {
            window.gifshot.createGIF({
                gifWidth,
                gifHeight,
                images,
                interval,
                numWorkers: 4,
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