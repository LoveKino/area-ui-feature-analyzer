'use strict';

let {
    n, view
} = require('kabanery');

let {
    map
} = require('bolzano');

let ModifyRuleNodeView = require('./modifyRuleNodeView');

let areaMask = require('../util/areaMask');

let {
    restoreElement, elementMask
} = require('../util/restoreElement');

let {
    IGNORE_COLOR, UPGRADE_COLOR
} = require('../util/const');

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
            border: '1px solid rgba(200, 200, 200, 0.7)',
        }
    }, [
        // head description
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
        nodeType, nodeName
    } = ruleNode;
    nodeName = nodeName && nodeName.toLowerCase();

    let onchangeEditResults = (value) => {
        let id = value.ruleNode.id;
        if (value.doCancel) {
            delete editResults[id];
        } else {
            editResults[id] = value;
        }
        onchange && onchange(value, editResults);
    };

    if (nodeType === 'imageInnerNode' ||
        nodeType === 3 ||
        nodeName === 'input' ||
        nodeName === 'textarea') {
        let editResult = editResults[ruleNode.id];

        let elementMaskColor = editResult && editResult.type === 'ignore' ? IGNORE_COLOR : editResult && editResult.type === 'upgrade' ? UPGRADE_COLOR : null;

        return n('div', [
            // area mask
            areaMask({
                showRule,
                ruleNode
            }),

            renderNode(ruleNode, {
                onclick: () => {
                    update('modify', true);
                }
            }, elementMaskColor),

            modify && ModifyRuleNodeView({
                editResult: editResults[ruleNode.id],

                onIgnore: (ruleNode, doCancel) => {
                    onchangeEditResults({
                        ruleNode,
                        doCancel,
                        type: 'ignore'
                    });
                    update('modify', false);
                },

                ruleNode,

                onUpgrade: (ruleNode, doCancel) => {
                    onchangeEditResults({
                        ruleNode,
                        doCancel,
                        type: 'upgrade'
                    });
                    update('modify', false);
                }
            })
        ]);
    }
});

let renderNode = (ruleNode, options, elementMaskColor) => {
    return [
        elementMask(ruleNode, elementMaskColor, options),
        restoreElement(ruleNode)
    ];
};
