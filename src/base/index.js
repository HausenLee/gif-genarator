import CGif from "./gif";
import CImage from "./images";
import CText from "./text";
import CVideo from "./video";
import CAPng from "./apng";
import CAnimate from "./animate";
import {templateData} from "./config";
import Utils from '../utils/index'
class CTemplate {
    constructor(data) {
        this.width = 600;
        this.height = 600;
        this.fps = 10;
        this.gifWidth = this.width;
        this.gifHeight = this.height;
        this.pageShots = []

        this.changeTemplateType();
    }
    changeTemplateType(type) {
        this.elementsData = templateData
        this.elements = this.elementsData.map((item,index) => {
            item.key = index;
            switch(item.type) {
                case 'ctext' :
                    return new CText(item);
                case 'cimage' :
                    return new CImage(item);
                case 'cgif' :
                    return new CGif(item);
                case 'cvideo' :
                    return new CVideo(item);
                case 'capng' :
                    return new CAPng(item);
                case 'canimate' :
                    return new CAnimate(item);
        }
        })
    }   
    toSvg(isDownload,time) {
        let eleSvg = ''

        this.elements.forEach(item => {
            eleSvg += item.toSvg(false,isDownload,time);
        })
        const svg = isDownload ? `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this.width} ${this.height}" width="${this.width}" height="${this.height}">
                <g transform="translate(0,0)">
                    <rect x="0" y="0" height="${this.height}" width="${this.width}" style="fill: #fff" />
                </g>
                ${eleSvg}
            </svg>
        `: ``

        document.querySelector('.svgTest').innerHTML = svg;
        return svg;
    }
    getMaxTime() {
        const times = this.elements.map(item => {
            if(['ctext','cimage'].includes(item.type)) {
                return 0
            } else if(['cgif','cvideo','capng','canimate'].includes(item.type)) {
                return item.durationTime;
            } 
        });

        return Math.max(...times)
    }
    generateGif() {
        return new Promise((resolve,reject) => {
            // 遍历最长时间，fps为30,计算单位时间间隔stepTime
            // 根据每个元素
            const maxTime = this.getMaxTime();
            const stepTime = 1000 / this.fps;
            const DOMURL = window.URL || window.webkitURL || window;
            let shot,svgBlob = '',svgBlobUrl = '';
            
            for(let time=0;time<maxTime;time+=stepTime) {
                let svgStr = this.toSvg(true,time)
                this.elements.forEach(item => {
                    let idx = 0;
                    switch (item.type) {
                        case 'cgif':
                            idx = ~~(time / item.speed) % item.duration;
                            shot = item.shotBase64[idx];
                            svgStr = svgStr.replace(item.src,shot);
                            break;
                        case 'cvideo':
                            idx = ~~(time / item.speed) % item.duration;
                            console.log(idx,item.duration);
                            shot = item.shotBase64[idx];
                            svgStr = svgStr.replace(item.src,shot);
                            break;
                        case 'capng':
                            idx = ~~(time / item.speed) % item.duration;
                            shot = item.shotBase64[idx];
                            svgStr = svgStr.replace(item.src,shot);
                            break;
                    }
                })
                svgBlob = new Blob([svgStr], {type: "image/svg+xml"});
                svgBlobUrl = DOMURL.createObjectURL(svgBlob);
                this.pageShots.push(svgBlobUrl);
            }

            resolve();
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