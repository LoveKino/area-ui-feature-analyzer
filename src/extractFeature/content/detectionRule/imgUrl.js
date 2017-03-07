'use strict';

let {
    getTagName
} = require('../../../util');

let detect = (node) => {
    return getTagName(node) === 'img';
};

let genRules = (node) => {
    // img url?
    // strict mode
    return [{
        extractorType: 'containImgUrl',
        patternType: 'equal',
        pattern: node.getAttribute('url')
    }];
};

module.exports = {
    detect,
    genRules
};
