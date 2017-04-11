'use strict';

let {
    getBoundRect
} = require('ui-description-view');

let genPositionDetectionRule = (node, options) => {
    let rect = getBoundRect(node);

    return getPositionArea(rect, options);
};

/**
 *
 * ## test
 *
 * [
 *    [
 *      [
 *          {
 *              left: 60,
 *              top: 797,
 *              width: 14,
 *              height: 32,
 *              bottom: 859,
 *              right: 74
 *          },
 *          {
 *              scope: {
 *                  width:1200,
 *                  height: 874,
 *                  x: 0,
 *                  y: 0
 *              },
 *
 *              rectBlurRatio: 1.5,
 *
 *              minGridWidth: 0,
 *              minGridHeight: 0
 *          }
 *      ],
 *
 *      {
 *      }
 *    ]
 * ]
 */
let getPositionArea = (rect, {
    scope,
    rectBlurRatio,
    minGridWidth,
    minGridHeight
}) => {
    let bluredRect = blur(rect, rectBlurRatio, {
        minGridWidth,
        minGridHeight,
        maxGridWidth: scope.width, maxGridHeight: scope.height
    });

    let m = Math.floor(scope.width / rect.width);
    let n = Math.floor(scope.height / rect.height);

    let unitWidth = scope.width / m,
        unitHeight = scope.height / n;

    let grid = [m, n],
        area = [
            [
                Math.floor(bluredRect.x / unitWidth),
                Math.floor(bluredRect.y / unitHeight)
            ],
            [
                Math.floor((bluredRect.x + bluredRect.width) / unitWidth),
                Math.floor((bluredRect.y + bluredRect.height) / unitHeight)
            ]
        ];

    return [
        grid, area, [

            {
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
                bottom: rect.bottom,
                right: rect.right,
                leftOffset: rect.leftOffset
            },

            rectBlurRatio
        ]
    ];
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


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/node_modules/defcomment/src/unit').exportsVariable;
    __exportsVariable('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/test/unit/dest/extractFeature/position.js', 'getPositionArea', getPositionArea);
})();