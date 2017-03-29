'use strict';

let detect = (node) => {
    return node.nodeType === 3;
};

let genRules = (text) => {
    // img url?
    // strict mode
    return [{
        extractorType: 'textContent',
        patternType: 'trimEqual',
        pattern: text,
        active: true
    }];
};

let getContent = (node) => {
    return node.textContent.trim();
};

module.exports = {
    detect,
    getContent,
    genRules
};
