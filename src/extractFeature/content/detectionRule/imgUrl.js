'use strict';

let {
    getTagName
} = require('../../../util');

let {
    reduce
} = require('bolzano');

let url = require('url');

let detect = (node) => {
    return getTagName(node) === 'img' || node.nodeType === 'imageInnerNode';
};

let genRules = (imgUrl) => {
    if (!imgUrl) return;

    let urlObject = url.parse(imgUrl);

    return reduce(['protocol', 'hostname', 'query', 'pathname', 'path', 'href', 'hash'], (prev, name) => {
        if (urlObject[name]) {
            prev.push({
                extractorType: 'imgUrl',
                patternType: `url_${name}_equal`,
                pattern: urlObject[name],
                name: `img_${name}_equal`,
                active: true
            });
        }
        return prev;
    }, []);
};

let getContent = (node) => {
    if (node.nodeType === 'imageInnerNode') {
        return node.getImageUrl();
    } else {
        return node.getAttribute('src');
    }
};

module.exports = {
    detect,
    getContent,
    genRules
};
