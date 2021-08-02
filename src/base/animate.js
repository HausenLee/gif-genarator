import TheElement from './ele'
import { cssAnimationFrame } from './config';

export default class CText extends TheElement {
    constructor(data) {
        super(data);
        this.key = data.key;
        this.content = data.content;
        this.animate = data.animate;
        this.width = 200;
        this.height = 30;
        this.loaded = true
        this.animation = cssAnimationFrame[this.animate];
        this.durationTime = this.animation.duration;
        this.duration = this.animation.values.length;
        this.speed = this.durationTime / this.duration ;
    }

    getAnimate() {
        const {animation} = this;
        const animationStr = animation.values.reduce((currentStr, value, index) => {
            const frames = animation.cssFrames[index];
            const framesStr = Object.keys(frames).reduce((str, key) => {
                return str + `${key}:${frames[key]};`
            }, '');
            return currentStr + `${value*100}% {${framesStr}}`;
        },'');

        const styleTag = `
            <style type="text/css">
                @keyframes ${this.animate} {
                    ${animationStr}
                }
            </style>
        `;

        const animateStr = `animation-delay:${animation.delay}ms;animation-duration:${animation.duration}ms;animation-name:${this.animate};animation-iteration-count:${animation.count};transform-origin:${animation.origin};`

        return  {
            styleTag,
            animateStr
        }
    }

    getMatrix() {

    }

    getAnimateFrame(time) {
        const {animation} = this;
        const indexStart = ~~(time / this.speed) % this.duration;
        const indexEnd = ~~(time / this.speed + 1) % this.duration;
        const timeStep = time % this.speed;
        const timePecent = timeStep / this.speed;

        // console.log(timeStep,this.speed)
            
        const styleStart = animation.cssFrames[indexStart];
        const styleEnd = animation.cssFrames[indexEnd];
        let styleStr = '';
        let val = '';
        Object.keys(styleStart).forEach(key => {
            let startProp = styleStart[key];
            let startEnd = styleEnd[key];

            switch(key) {
                case 'transform':
                    let matrixStart = new WebKitCSSMatrix(startProp)
                    let matrixEnd = new WebKitCSSMatrix(startEnd || '')
                    let matrix = {}
                    matrix.a = matrixStart.a == 1 && matrixEnd.a == 1 ? 1 : matrixStart.a + (matrixEnd.a - matrixStart.a) * timePecent;
                    matrix.b = matrixStart.b == 0 && matrixEnd.b == 0 ? 0 : matrixStart.b + (matrixEnd.b - matrixStart.b) * timePecent;
                    matrix.c = matrixStart.c == 0 && matrixEnd.c == 0 ? 0 : matrixStart.c + (matrixEnd.c - matrixStart.c) * timePecent;
                    matrix.d = matrixStart.d == 1 && matrixEnd.d == 1 ? 1 : matrixStart.d + (matrixEnd.d - matrixStart.d) * timePecent;
                    matrix.e = matrixStart.e == 0 && matrixEnd.e == 0 ? 0 : matrixStart.e + (matrixEnd.e - matrixStart.e) * timePecent;
                    matrix.f = matrixStart.f == 0 && matrixEnd.f == 0 ? 0 : matrixStart.f + (matrixEnd.f - matrixStart.f) * timePecent;
                    val = `translate(${this.left},${this.top}) matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f})`;
                    
                    break;
                case 'opacity':
                    startEnd = startEnd === undefined ? 1 : startEnd;
                    val = startProp + (startEnd - startProp) * timePecent;
                    break;
            }

            styleStr += `${key}="${val}" `
        })
        return styleStr;
    }

    toSvg(isAll = true,isDownload,time) {
        let svg = '';

        if(isDownload) {
            const frameStr = this.getAnimateFrame(time);
            console.log(frameStr);
            svg = `
            <g ${frameStr}>
                <text dy="20" text-anchor="start" fill="black" style="font-size:20px;">
                    ${this.content}
                </text>
            </g>
            `;
        } else {
            const {
                styleTag,
                animateStr
            } = this.getAnimate();

            svg = `<div id="the-canimate-${this.key}" style=${animateStr}>
                ${styleTag}
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this.width} ${this.height}" width="${this.width}" height="${this.height}">
                    <g>
                        <text dy="20" text-anchor="start" fill="black" style="font-size:20px;">
                            ${this.content}
                        </text>
                    </g>
                </svg>
            </div>`;
        }
        return svg;
    }
    
}