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
        this.speed = 100;
        this.duration = this.durationTime / this.speed;
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

    getAnimateFrame(time) {
        const {animation} = this;
        const index = ~~(time / this.speed) % this.duration;
        console.log(time,this.speed,index,this.duration)
            
        const style = document.getElementById('the-canimate-2').style.transform;
        console.log(style)
        // const frame = animation.Frames[index];

    }

    toSvg(isAll = true,isDownload,time) {
        let svg = '';

        if(isDownload) {
            const frameStr = this.getAnimateFrame(time);

            svg = `
                <g transform="translate(${this.left},${this.top})">
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