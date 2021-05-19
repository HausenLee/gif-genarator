
import Utils from '../utils/index'
class CVideoTo {
    constructor(data) {
        this.width = 600;
        this.height = 600;

        this.fps = 30;
        this.gifWidth = this.width;
        this.gifHeight = this.height;
    }
    toSvg(isDownload) {

        return `
            <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 600 600"
            width="600"
            height="600"
        >
            <g>
            <rect width="90" height="90" fill="yellow">
                <animate
                attributeName="x"
                values="160;40;160"
                begin="0s"
                dur="3s"
                repeatCount="indefinite"
                />
            </rect>
            </g>
    
            <g transform="translate(100,100)">
            <rect width="90" height="90" fill="yellow">
                <animateTransform attributeName="transform" begin="0s" dur="3s"  type="rotate" values="0;40;0" repeatCount="indefinite"/>
            </rect>
            </g>
        </svg>
        `
    }
}

export default new CVideoTo();