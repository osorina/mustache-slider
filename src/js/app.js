import '@/scss/index.scss';

import { Slider } from './slider/Slider';
import { utils } from './slider/helpers/utils';

const App = new Slider('#gallery', {
    size: 2,
    current: 2,
    photos: [
        { id: 1, src: 'assets/slides/x1/1.jpg' },
        { id: 2, src: 'assets/slides/x1/2.jpg' },
        { id: 3, src: 'assets/slides/x1/3.jpg' },
        { id: 4, src: 'assets/slides/x1/4.jpg' },
        { id: 5, src: 'assets/slides/x1/5.jpg' },
        { id: 6, src: 'assets/slides/x1/6.jpg' }
    ],
    beforeCreate: (slider) => {
        let directory = 'assets/slides/';

        const ratio = Math.floor(utils.getDevicePixelRatio());

        const newDirectory = directory + `x${ratio}/`;
        const testImage = newDirectory + slider.slides[0].src;

        if (utils.checkImageSrc(testImage)) {
            directory = newDirectory;
        }

        slider.slides.forEach(slide => slide.src = directory + slide.src);
    }
});

App.render();
