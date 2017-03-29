'use strict';

// TODO show matchedRules and notMatchedRules in view

let {
    map, reduce
} = require('bolzano');

let getStyleDetectionRules = (node, {
    styleItems = ['background-color', 'font-size', 'color'], styleBlur = {
        colorSimilarity: 80,
        fontSizeAround: 20
    }
} = {}) => {
    // only for element node, TODO text node, font-size and color
    if (node.nodeType !== 1) return {
        styleMap: {},
        rules: []
    };

    let styleMap = reduce(styleItems, (prev, item) => {
        prev[item] = window.getComputedStyle(node).getPropertyValue(item);
        return prev;
    }, {});

    return {
        styleMap,

        rules: map(styleItems, (item) => {
            if (item === 'background-color' || item === 'color') {
                return {
                    extractorType: item,
                    patternType: `color_similarity_ge_${styleBlur.colorSimilarity}`,
                    pattern: styleMap[item],
                    active: true
                };
            } else if (item === 'font-size') {
                return {
                    extractorType: item,
                    patternType: `around_${styleBlur.fontSizeAround}Percent`,
                    pattern: styleMap[item],
                    active: true
                };
            }

            return {
                extractorType: item,
                patternType: 'equal',
                pattern: styleMap[item],
                active: true
            };
        })
    };
};

module.exports = {
    getStyleDetectionRules
};
