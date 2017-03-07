'use strict';

let {
    getBoundRect
} = require('ui-description-view');

let genPositionDetectionRule = (node, {
    scope,
    rectBlurRatio,
    minGridWidth,
    minGridHeight
}) => {
    let rect = getBoundRect(node);

    let bluredRect = blur(rect, rectBlurRatio, {
        minGridWidth,
        minGridHeight,
        maxGridWidth: scope.width, maxGridHeight: scope.height
    });

    let m = Math.floor(scope.width / bluredRect.width);
    let n = Math.floor(scope.height / bluredRect.height);
    let unitWidth = scope.width / m,
        unitHeight = scope.height / n;

    let grid = [m, n],
        area = [
            [
                Math.floor(bluredRect.x / unitWidth),
                Math.floor(bluredRect.y / unitHeight)
            ],
            [
                Math.ceil((bluredRect.x + bluredRect.width) / unitWidth),
                Math.ceil((bluredRect.y + bluredRect.height) / unitHeight)
            ]
        ];

    return [grid, area];
};

let blur = (rect, rectBlurRatio, {
    minGridWidth,
    minGridHeight,
    maxGridWidth,
    maxGridHeight
}) => {
    let newWidth = Math.min(Math.max(rect.width * rectBlurRatio, minGridWidth), maxGridWidth);
    let newHeight = Math.min(Math.max(rect.height * rectBlurRatio, minGridHeight), maxGridHeight);

    let x = Math.max(rect.left - (newWidth - rect.width) / 2, 0);

    let y = Math.max(rect.top - (newHeight - rect.height) / 2, 0);

    return {
        width: newWidth,
        height: newHeight,
        x,
        y
    };
};

module.exports = {
    genPositionDetectionRule
};
