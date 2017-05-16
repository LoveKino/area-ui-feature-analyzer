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
    minGridHeight,
    maxGridX = 20,
    maxGridY = 20
}) => {
    let bluredRect = blur(rect, rectBlurRatio, {
        minGridWidth,
        minGridHeight,
        maxGridWidth: scope.width, maxGridHeight: scope.height
    });

    let m = rect.width === 0 ? 3 : Math.floor(scope.width / rect.width);
    let n = rect.height === 0 ? 3 : Math.floor(scope.height / rect.height);
    if (m > maxGridX) m = maxGridX;
    if (n > maxGridY) n = maxGridY;

    let grid = [m, n],
        area = [
            [
                Math.floor(bluredRect.x * m / scope.width), // using floor to move left
                Math.floor(bluredRect.y * n / scope.height) // using floor to move top
            ],
            [
                Math.ceil((bluredRect.x + bluredRect.width) * m / scope.width), // using ceil to move right
                Math.ceil((bluredRect.y + bluredRect.height) * n / scope.height) // using ceil to move bottom
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
    genPositionDetectionRule,
    getPositionArea
};
