'use strict';

let {
    getTagName
} = require('../../../util');

let detect = (node) => {
    return getTagName(node) === 'input' || getTagName(node) === 'textarea';
};

let genRules = (node) => {
    let value = node.value;

    return [{
        extractorType: 'inputValue',
        patternType: 'trimEqual',
        pattern: value,
        active: true
    }];
};

module.exports = {
    detect,
    genRules
};
