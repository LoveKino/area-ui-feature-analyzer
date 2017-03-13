'use strict';

let {
    getTagName
} = require('../../../util');

let detect = (node) => {
    return getTagName(node) === 'input' || getTagName(node) === 'textarea';
};

let genRules = (node) => {
    let value = node.getAttribute('value');

    if (value) {
        return [{
            extractorType: 'inputValue',
            patternType: 'trimEqual',
            pattern: value
        }];
    }
};

module.exports = {
    detect,
    genRules
};