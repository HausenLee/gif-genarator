import TheElement from './ele'

export default class CText extends TheElement {
    constructor(data) {
        super(data);
        this.content = data.content;
        this.width = 200;
        this.height = 30;
        this.loaded = true
    }

    toSvg(isAll = true,isDownload) {
        return isDownload ? `
            <g transform="translate(${this.left},${this.top})">
                <text dy="20" text-anchor="start" fill="black" style="font-size:20px;">
                    ${this.content}
                </text>
            </g>
        ` : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this.width} ${this.height}" width="${this.width}" height="${this.height}">
                <g>
                    <text dy="20" text-anchor="start" fill="black" style="font-size:20px;">
                        ${this.content}
                    </text>
                </g>
            </svg>`;
    }
    
}