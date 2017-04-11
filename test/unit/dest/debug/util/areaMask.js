'use strict';

let {
    mergeMap
} = require('bolzano');

let {
    n
} = require('kabanery');

/**
 *
 * build a area mask for node
 */
module.exports = ({
    showRule,
    ruleNode
}) => {
    let {
        position, scope
    } = ruleNode;

    return n('div', {
        style: mergeMap({
            position: 'absolute',
            textAlign: 'center',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            border: showRule ? '1px solid rgba(200, 200, 200, 0.4)' : 0
        }, getPosition(position, scope))
    });
};

let getPosition = ([
    [gw, gh],
    [
        [x1, y1], // left top
        [x2, y2] // right bottom
    ]
], {
    width, height
}) => {
    let uw = (width / gw),
        uh = (height / gh);
    let w = uw * (x2 - x1);
    let h = uh * (y2 - y1);
    let left = uw * x1,
        top = uh * y1;

    return {
        width: w,
        height: h,
        left,
        top
    };
};


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/node_modules/defcomment/src/unit').exportsVariable;
    
})();