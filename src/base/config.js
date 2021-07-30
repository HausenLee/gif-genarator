export const templateData = [
        {
            type: 'ctext',
            content: '这是apng',
            top: 20,
            left: 300,
        },{
            type: 'ctext',
            content: '这是webm',
            top: 390,
            left: 20,
        },{
            type: 'canimate',
            content: '这是MP4',
            animate: 'rubberBand',
            top: 226,
            left: 20,
        },{
            type: 'cimage',
            src: 'imgs/img1.jpg',
            top: 10,
            left: 20,
        },
        // {
        //     type: 'capng',
        //     src: 'imgs/apng.png',
        //     top: 152,
        //     left: 300,
        // },
        // {
        //     type: 'cvideo',
        //     src: 'imgs/Fireworks.mp4',
        //     top: 250,
        //     left: 20,
        // },
        // {
        //     type: 'cvideo',
        //     src: 'imgs/CuteCat.mp4',
        //     top: 420,
        //     left: 20,
        // },
        {
            type: 'ctext',
            content: '这是gif',
            top: 400,
            left: 300,
        },
        // {
        //     type: 'cgif',
        //     src: 'imgs/gif3.gif',
        //     top: 400,
        //     left: 300,
        // }
]

export const cssAnimationFrame = {
    rubberBand: {
        duration: 3000,
        delay: 0,
        count: "infinite",
        timing: 'linear',
        origin: '0 0',
        values: [0,0.2,0.4,0.6,0.8,1],
        frames: [
            {
                
            },
            {
                transform: 'rotate(80)',
            },
            {
                transform: 'rotate(60)',
            },
            {
                transform: 'rotate(80)',
            },
            {
                transform: 'rotate(60)',
                opacity: 1
            },
            {
                transform: 'translate(0,700)',
                opacity: 0
            }
        ],
        cssFrames: [
            {
                
            },
            {
                transform: 'rotate(80deg)',
            },
            {
                transform: 'rotate(60deg)',
            },
            {
                transform: 'rotate(80deg)',
            },
            {
                transform: 'rotate(60deg)',
                opacity: 1
            },
            {
                transform: 'translate(0,700px)',
                opacity: 0
            }
        ],
    }
}