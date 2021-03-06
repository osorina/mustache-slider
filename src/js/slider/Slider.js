import { utils } from './helpers/utils';
import { dom as $ } from './helpers/dom';

import { buildSlider } from './slider.build';
import { KEYMAP, CLASSES, OPTIONS as DEFAULT_OPTIONS } from './constants';

export class Slider {
    constructor(root, options = {}) {
        options = utils.merge(DEFAULT_OPTIONS, options);

        this.options = options;

        this.size = options.size;
        this.index = options.current;

        this.slides = options.photos;
        this.length = this.slides.length;
        this.lastIndex = this.slides.length - 1;

        this.$root = $.get(root);
    }

    /**
     * init Slider
     */
    init() {
        this.check();

        this.options.beforeInit?.(this);

        this.build();

        this.setSize();

        this.goTo({ slideId: this.index });

        this.bindEvents();
    }

    /**
     * Check Dom container, size and length properies
     */
    check() {
        if (!$.isDOM(this.$root)) {
            throw new Error('SLIDER.JS: Container is not a DOM element!');
        }

        if (!this.length) {
            throw new Error('SLIDER.JS: No photos were found!');
        }

        if (this.size > this.length || this.size < 0) {
            this.size = this.length;
        }
    }


    /**
     * Build slider from slider.mustache, collect dom nodes
     */
    build() {
        const $slider = buildSlider(this.slides);

        // TODO: Create class SlideBuilder and store nodes there
        this.$track = $.find($slider, `.${ CLASSES.track }`);
        this.$next = $.find($slider, '[data-direction="next"]');
        this.$prev = $.find($slider, '[data-direction="prev"]');
        this.$slides = Array.from($.findAll($slider, `.${ CLASSES.slide }`));

        $.append(this.$root, $slider);

        setTimeout(() => {
            $.toggleClass($slider, false, CLASSES.rootUninit);
        }, 50);
    }

    /**
     * Set track and slides width
     */
    setSize() {
        const slideStyles = getComputedStyle(this.$slides[0]);
        this.marginOffset = parseFloat(slideStyles.marginRight.replace('px', '')) / 100;

        const ratio = this.length / this.size;

        const trackWidth = ratio * 100;
        const slideWidth = (100 / this.size / ratio) + this.marginOffset;

        this.$slides.forEach(slide => slide.style.width = `${slideWidth}%`);

        this.$track.style.width = `${trackWidth}%`;

        this.sizeIsEven = (this.size % 2) === 0;
        this.sizeIsFull = (this.size === this.length);
    }

    /**
     * Updates the slide folder according to the ratio factor (floor)
     *
     * @param {object} map - folders map. Example: ({x3: 'slides-for-x3'})
     *
     */
    setRatioDirectory(map = {}) {
        const filename = (path = '') => path.replace(/^.*[\\/]/, '');

        const image = filename(this.slides[0]?.src);
        const ratio = `x${ Math.floor(utils.getDevicePixelRatio()) }`;
        const directory = map[ratio];

        if (directory && utils.fileExist(directory + image)) {
            this.slides.forEach(slide => slide.src = directory + filename(slide.src));
        }
    }

    /**
     * Go Back
     */
    goBack() {
        const index = this.index - 1;

        this.goTo({ index });
    }

    /**
     * Go Forward
     */
    goForward() {
        const index = this.index + 1;

        this.goTo({ index });
    }

    /**
     * Go to slide
     *
     * @param {any} slideId  slide default propery
     * @param {number} index slide index
     *
     */
    goTo({ slideId, index } = {}) {
        if (slideId) {
            // eslint-disable-next-line eqeqeq
            index = this.$slides.findIndex(el => el.dataset.slideId == slideId);
        }

        if (index < 0) {
            index = 0;
        }

        if (index > this.lastIndex) {
            index = this.lastIndex;
        }

        const slideFactor = this.getSlideFactor(index);
        const translateX = ~(slideFactor * 100) / this.length;

        this.$track.style.transform = 'translate3d(' + translateX + '%, 0, 0)';

        this.index = index;

        this.onMove();
    }

    /**
     * Get slide factor in percentages
     *
     * @param {number} index - slide index
     *
     * @return {number}
     */
    getSlideFactor(index) {
        const remnant = Math.floor(this.size / 2);
        const center = this.sizeIsEven ? (remnant - 0.5) : remnant;
        const margin = ((this.marginOffset / 10) * this.size);

        let slideFactor = index - center;

        const isFirstViewport = slideFactor < 0;
        const isLastViewport = (slideFactor + this.size) >= this.length;

        if (isFirstViewport) {
            slideFactor = 0;
        }

        else if (isLastViewport) {
            slideFactor = this.lastIndex - (this.size - 1);
        }

        slideFactor -= margin;

        return slideFactor;
    }

    /**
     * Update active class in slides list, disable buttons if necessary
     */
    onMove() {
        $.toggleClassByIndex(this.$slides, this.index, CLASSES.slideActive);

        this.disableButtons();
    }

    disableButtons() {
        this.disabledNext = (this.index === this.lastIndex);
        this.disabledPrev = (this.index === 0);

        if (this.sizeIsFull) {
            this.disabledPrev = this.disabledNext = true;
        }

        $.toggleClass([this.$prev], (this.disabledPrev), CLASSES.btnDisabled);
        $.toggleClass([this.$next], (this.disabledNext), CLASSES.btnDisabled);
    }

    /**
     * Bind events
     */
    bindEvents() {
        // TODO: Fix optimization: handle a whole NodeList on click
        // TODO: Create destroy method()

        this.goTo = this.goTo.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goForward = this.goForward.bind(this);

        this.setSize = this.setSize.bind(this);

        this.$next.addEventListener('click', this.goForward);
        this.$prev.addEventListener('click', this.goBack);

        this.$slides.forEach((slide) => {
            slide.addEventListener('click', () => {
                const { slideId } = slide.dataset;

                this.goTo({ slideId });
            });
        });

        document.addEventListener('keydown', (e) => {
            e.preventDefault();

            const altKey = e.altKey;
            const cmdKey = e.ctrlKey || e.metaKey;

            const prefix = `${ cmdKey ? 'cmd_' : ''}${ altKey ? 'alt_' : '' }`;
            const keyCode = `${ prefix }${ e.keyCode }`;

            const event = KEYMAP[keyCode];

            if (event && this[event]) {
                this[event]();
            }
        });

        window.addEventListener('resize', this.setSize);
    }
}
