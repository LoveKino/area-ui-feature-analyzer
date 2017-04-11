'use strict';

// TODO show matchedRules and notMatchedRules in view

let {
    map, reduce, interset
} = require('bolzano');

let {
    getFontSize, getColor
} = require('ui-description-view');

let getStyleDetectionRules = (node, {
    styleItems = ['background-color', 'font-size', 'color'], styleBlur = {
        colorSimilarity: 80,
        fontSizeAround: 20
    }
} = {}) => {
    if (node.nodeType === 3) {
        return getStyleRules(node, {
            styleItems: interset(styleItems, ['font-size', 'color']),
            styleBlur
        });
    }

    if (node.nodeType !== 1) return {
        styleMap: {},
        rules: []
    };

    return getStyleRules(node, {
        styleItems,
        styleBlur
    });
};

let getStyleRules = (node, {
    styleItems, styleBlur
}) => {
    let styleMap = reduce(styleItems, (prev, item) => {
        prev[item] = item === 'color' ? getColor(node) :
            item === 'font-size' ? getFontSize(node) : window.getComputedStyle(node).getPropertyValue(item);
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


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/node_modules/defcomment/src/unit').exportsVariable;
    
})();