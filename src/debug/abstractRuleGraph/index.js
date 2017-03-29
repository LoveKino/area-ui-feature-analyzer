'use strict';

let {
    n, view
} = require('kabanery');

let {
    map, mergeMap
} = require('bolzano');

let ModifyRuleNodeView = require('./modifyRuleNodeView');

let renderNode = require('./renderNode');

let {
    IGNORE_COLOR, UPGRADE_COLOR
} = require('./const');

/**
 * build abstract rule graph
 *
 * TODO: edit results
 *  {
 *      [id]: {
 *          op: ignore | upgrade | normal,  // default is normal
 *          ruleNode
 *      }
 *  }
 */

module.exports = view(({
    ruleNodes,
    width,
    height,
    onchange,
    editResults = {}
}) => {
    return n('div', {
        style: {
            'font-size': 14,
            border: '1px solid rgba(200, 200, 200, 0.7)',
        }
    }, [
        n('div', {
            style: {
                padding: 10
            }
        }, [
            n('label', 'ignore'),
            n('div', {
                style: {
                    display: 'inline-block',
                    width: 18,
                    height: 18,
                    backgroundColor: IGNORE_COLOR,
                    marginRight: 20,
                    marginLeft: 5
                }
            }),
            n('label', 'upgrade'),
            n('div', {
                style: {
                    display: 'inline-block',
                    width: 18,
                    height: 18,
                    backgroundColor: UPGRADE_COLOR,
                    marginRight: 20,
                    marginLeft: 5
                }
            })
        ]),
        n('div', {
            style: {
                position: 'relative',
                width,
                height,
                border: '1px solid rgba(200, 200, 200, 0.7)',
                overflow: 'auto'
            }
        }, map(ruleNodes, (ruleNode) => renderRuleNode({
            ruleNode,
            onchange,
            editResults
        })))
    ]);
});

let renderRuleNode = view(({
    ruleNode,
    showRule,
    modify,
    onchange,
    editResults
}, {
    update
}) => {
    let {
        nodeType, nodeName, position, scope
    } = ruleNode;
    nodeName = nodeName && nodeName.toLowerCase();

    let onchangeEditResults = (value) => {
        editResults[value.ruleNode.id] = value;
        onchange && onchange(value);
    };

    // TODO render edit results

    if (nodeType === 'imageInnerNode' ||
        nodeType === 3 ||
        nodeName === 'input' ||
        nodeName === 'textarea') {

        return n('div', [
            // area mask
            n('div', {
                style: mergeMap({
                    position: 'absolute',
                    textAlign: 'center',
                    display: 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                    border: showRule ? '1px solid rgba(200, 200, 200, 0.4)' : 0
                }, getPosition(position, scope))
            }),

            renderNode(ruleNode, {
                onclick: () => {
                    update('modify', true);
                }
            }, editResults[ruleNode.id]),

            modify && ModifyRuleNodeView({
                onIgnore: (ruleNode) => {
                    onchangeEditResults({
                        ruleNode,
                        type: 'ignore'
                    });
                    update('modify', false);
                },

                ruleNode,

                onUpgrade: (ruleNode) => {
                    onchangeEditResults({
                        ruleNode,
                        type: 'upgrade'
                    });
                    update('modify', false);
                }
            })
        ]);
    }
});

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
