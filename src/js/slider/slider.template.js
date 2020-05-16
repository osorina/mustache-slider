import { dom as $ } from './helpers/dom';

const sliderTemplate = require('./templates/slider.mustache');

export const buildSlider = (slides) => {
    const template = sliderTemplate({ slides });
    const slider = $.create(template);

    return slider;
};
