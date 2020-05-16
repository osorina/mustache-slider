const get = (selector) => {
    return document.querySelector(selector);
};

const find = (container, selector) => {
    return container ? container.querySelector(selector.split(' ')[0]) : null;
};

const findAll = (container, selector) => {
    return container ? container.querySelectorAll(selector.split(' ')[0]) : null;
};

const create = (html, tag = 'div') => {
    const div = document.createElement(tag);
    div.innerHTML = html;

    return div.firstElementChild;
};

const append = (el, node) => {
    if (Element.prototype.append) {
        el.append(node);
    }
    else {
        el.appendChild(node);
    }

    return el;
};

const isDOM = (o) => {
    return (
        typeof HTMLElement === 'object' ? o instanceof HTMLElement :
            o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'
    );
};

const toggleClass = (target, add = false, className = 'hidden') => {
    const _toggle = el => el.classList[add ? 'add' : 'remove'](className);

    const isSingleElement = isDOM(target);

    if (isSingleElement) {
        _toggle(target);
    }
    else {
        target.forEach(_toggle);
    }
};

const toggleClassByIndex = (group, index, className = 'active') => {
    group.forEach((el, _i) => {
        el.classList.remove(className);

        // eslint-disable-next-line eqeqeq
        if (index == _i) {
            el.classList.add(className);
        }
    });
};

export const dom = {
    get,
    find,
    findAll,
    create,
    append,
    isDOM,
    toggleClass,
    toggleClassByIndex
};
