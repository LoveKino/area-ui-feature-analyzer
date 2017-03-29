'use strict';

let {
    genPositionDetectionRule
} = require('./position');

let {
    genContentDetectionRules
} = require('./content');

let {
    getStyleDetectionRules
} = require('./style');

let uuidV4 = require('uuid/v4');

/**
 * extract features from node
 */

module.exports = (node, {
    rectBlurRatio = 1.5, minGridWidth = 0, minGridHeight = 0, contentRules, customContentRules = {}, styleItems, styleBlur
} = {}) => {
    let pageSize = getPageSize();

    let scope = {
        x: 0,
        y: 0,
        width: pageSize.width,
        height: pageSize.height
    };

    let contentDetectRets = genContentDetectionRules(node, {
        contentRules,
        customContentRules
    });

    let styleDetectRets = getStyleDetectionRules(node, {
        styleItems,
        styleBlur
    });

    return {
        content: contentDetectRets.rules,

        contentMap: contentDetectRets.contentMap,

        scope,
        position: genPositionDetectionRule(node, {
            scope,
            rectBlurRatio,
            minGridWidth,
            minGridHeight
        }),

        style: styleDetectRets.rules,

        styleMap: styleDetectRets.styleMap,

        nodeName: node.nodeName,

        nodeType: node.nodeType,

        id: uuidV4()
    };
};

let getPageSize = () => {
    var body = document.body,
        html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    var width = Math.max(body.scrollWidth, body.offsetWidth,
        html.clientWidth, html.scrollWidth, html.offsetWidth);

    return {
        height,
        width
    };
};
