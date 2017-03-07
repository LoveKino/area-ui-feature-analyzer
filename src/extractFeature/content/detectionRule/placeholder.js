'use strict';

let {
    getTagName
} = require('../../../util');

let detect = (node) => {
    return getTagName(node) === 'input' || getTagName(node) === 'textarea';
};

let genRules = (node) => {
    // placeholder equal
    return [{
        extractorType: 'placeholder',
        patternType: 'trimEqual',
        pattern: node.getAttribute('placeholder')
    }];
};

module.exports = {
    detect,
    genRules
};
