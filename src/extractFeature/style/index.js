'use strict';

let {
    map
} = require('bolzano');

let getStyleDetectionRules = (node, {
    styleItems = ['background-color', 'font-size', 'color']
} = {}) => {
    // only for element node
    if (node.nodeType !== 1) return [];

    return map(styleItems, (item) => {
        return {
            extractorType: item,
            patternType: 'equal',
            pattern: window.getComputedStyle(node).getPropertyValue(item)
        };
    });
};

module.exports = {
    getStyleDetectionRules
};
