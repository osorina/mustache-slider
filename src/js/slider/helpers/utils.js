/**
 * merge - Deep recursive merge
 *
 * @param {object} target
 * @param {object} sources
 *
 * @return {object} Merged object
 */
const merge = (target, ...sources) => {
    if (!sources.length) {
        return target;
    }

    const isObject = item => (item && typeof item === 'object' && !Array.isArray(item));

    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }

                merge(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return merge(target, ...sources);
};


const getDevicePixelRatio = () => {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    if (window.devicePixelRatio !== undefined && !isFirefox) {
        return window.devicePixelRatio;
    }

    else if (window.matchMedia) {
        const x75 = '(-webkit-min-device-pixel-ratio: 0.75),(min-device-pixel-ratio: 3/4), (min-resolution: 0.75dppx)';
        const x150 = '(-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';
        const x200 = '(-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2/1), (min-resolution: 2dppx)';
        const x300 = '(-webkit-min-device-pixel-ratio: 2.25), (min-device-pixel-ratio: 2.25), (min-resolution: 288dpi)';

        if (window.matchMedia(x75).matches) {
            return 0.7;
        }

        if (window.matchMedia(x150).matches) {
            return 1.5;
        }

        if (window.matchMedia(x200).matches) {
            return 2;
        }

        if (window.matchMedia(x300).matches) {
            return 3;
        }
    }

    return 1;
};

const fileExist = (url) => {
    if (url) {
        const req = new XMLHttpRequest();

        req.open('GET', url, false);
        req.send();

        return req.status===200;
    }

    return false;
};

export const utils = {
    merge,
    getDevicePixelRatio,
    fileExist
};
