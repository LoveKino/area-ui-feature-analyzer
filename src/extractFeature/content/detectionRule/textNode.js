'use strict';

let detect = (node) => {
    return node.nodeType === 3;
};

let genRules = (node) => {
    // img url?
    // strict mode
    return [{
        extractorType: 'textContent',
        patternType: 'trimEqual',
        pattern: node.textContent.trim()
    }];
};

module.exports = {
    detect,
    genRules
};
