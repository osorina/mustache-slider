import '@/scss/index.scss';

import { Slider } from './slider/Slider';

const App = new Slider('#gallery', {
    photos: [
        { id: 1, src: 'assets/slides/1.jpg' },
        { id: 2, src: 'assets/slides/2.jpg' },
        { id: 3, src: 'assets/slides/3.jpg' },
        { id: 4, src: 'assets/slides/4.jpg' },
        { id: 5, src: 'assets/slides/5.jpg' },
        { id: 6, src: 'assets/slides/6.jpg' }
    ],
    size: 2,
    current: 2
});

App.init();
