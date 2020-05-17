import '@/scss/index.scss';

import { Slider } from './slider/Slider';

const App = new Slider('#gallery', {
    size: 2,
    current: '3',
    photos: [
        { id: '1', src: 'assets/slides/1.jpg' },
        { id: '3', src: 'assets/slides/2.jpg' },
        { id: '5', src: 'assets/slides/3.jpg' },
        { id: '7', src: 'assets/slides/4.jpg' },
        { id: '9', src: 'assets/slides/5.jpg' },
        { id: '4', src: 'assets/slides/6.jpg' }
    ],
    beforeInit: (slider) => {
        slider.setRatioDirectory({
            x2: 'assets/slides/x2/',
            x3: 'assets/slides/x3/'
        });
    }
});

App.init();
