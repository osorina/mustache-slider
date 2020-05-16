const merge = (obj1, obj2) => {
    const result = {};

    for (const prop in obj1) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj2.hasOwnProperty(prop)) {
            result[prop] = obj2[prop];
        }
        else {
            result[prop] = obj1[prop];
        }
    }

    return result;
};

export const utils = {
    merge
};
