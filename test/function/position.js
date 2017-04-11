'use strict';

let {
    getPositionArea
} = require('../../src/extractFeature/position');

let insideBox = require('ui-description-view/src/match/insideBox');

let assert = require('assert');

describe('position', () => {
    it('base', () => {
        let [gird, area] = getPositionArea({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0
        }, {
            scope: {
                width: 1200,
                height: 874,
                x: 0,
                y: 0
            },
            rectBlurRatio: 1.5,
            minGridWidth: 0,
            minGridHeight: 0
        });

        assert.deepEqual([gird, area], [
            [3, 3],
            [
                [0, 0],
                [0, 0]
            ]
        ]);
    });

    it('blur', () => {
        let rect = {
            left: 60,
            top: 797,
            width: 14,
            height: 32,
            bottom: 859,
            right: 74
        };
        let gridScope = {
            width: 1200,
            height: 874,
            x: 0,
            y: 0
        };
        let [grid, area] = getPositionArea(rect, {
            scope: gridScope,
            rectBlurRatio: 1.5,
            minGridWidth: 0,
            minGridHeight: 0
        });

        assert.deepEqual(insideBox(rect, [grid, area], gridScope), true);
    });
});
