'use strict';

let {
    getTagName
} = require('../../../util');

let detect = (node) => {
    return getTagName(node) === 'input' || getTagName(node) === 'textarea';
};

let genRules = (node) => {
    let placeholderValue = node.getAttribute('placeholder');
    let value = node.getAttribute('value');

    if (placeholderValue && !value) {
        // placeholder equal
        return [{
            extractorType: 'placeholder',
            patternType: 'trimEqual',
            pattern: placeholderValue,
            active: true
        }];
    }
};

module.exports = {
    detect,
    genRules
};
