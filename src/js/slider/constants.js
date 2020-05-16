const OPTIONS = {
    photos: [],
    size: 1,
    current: 1
};

const CLASSES = {
    root: 'slider',
    inner: 'slider__inner',
    track: 'slider__track',
    slide: 'slider__item',
    navigation: 'slider__navigation',

    rootUninit: 'uninitialized',
    slideActive: 'active',
    btnDisabled: 'disabled'
};

const KEYMAP = {
    37: 'goBack',
    39: 'goForward',
    cmd_37: 'goBack',
    cmd_39: 'goForward',
    9: 'goForward'
};

export {
    OPTIONS,
    KEYMAP,
    CLASSES
};
