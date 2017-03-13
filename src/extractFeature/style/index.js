'use strict';

let {
    map
} = require('bolzano');

let getStyleDetectionRules = (node, {
    styleItems = ['background-color', 'font-size', 'color'], styleBlur = {
        colorSimilarity: 80,
        fontSizeAround: 20
    }
} = {}) => {
    // only for element node
    if (node.nodeType !== 1) return [];

    return map(styleItems, (item) => {
        if (item === 'background-color' || item === 'color') {
            return {
                extractorType: item,
                patternType: `color_similarity_ge_${styleBlur.colorSimilarity}`,
                pattern: window.getComputedStyle(node).getPropertyValue(item),
                active: true
            };
        } else if (item === 'font-size') {
            return {
                extractorType: item,
                patternType: `around_${styleBlur.fontSizeAround}Percent`,
                pattern: window.getComputedStyle(node).getPropertyValue(item),
                active: true
            };
        }

        return {
            extractorType: item,
            patternType: 'equal',
            pattern: window.getComputedStyle(node).getPropertyValue(item),
            active: true
        };
    });
};

module.exports = {
    getStyleDetectionRules
};
