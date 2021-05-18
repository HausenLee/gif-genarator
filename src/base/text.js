import TheElement from './ele'

export default class CText extends TheElement {
    constructor(data) {
        super(data);
        this.content = data.content;
    }

    toSvg(isAll = true) {
        return `
            <g transform="translate(${this.left},${this.top})">
                <text dy="20" text-anchor="start" fill="black" style="font-size:20px;">
                    ${this.content}
                </text>
            </g>
        `;
    }
    
}