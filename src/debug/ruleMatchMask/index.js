'use strict';

let {
    n, view
} = require('kabanery');

let {
    restoreElement, elementMask
} = require('../util/restoreElement');

let {
    MATCHED_COLOR, NOT_MATCHED_COLOR
} = require('../util/const');

let {
    map, contain
} = require('bolzano');

module.exports = view(({
    matchedRules,
    notMatchedRules,
    ruleNodes,
    width = 400, height = 600
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
            n('label', 'matched rule'),
            n('div', {
                style: {
                    display: 'inline-block',
                    width: 18,
                    height: 18,
                    backgroundColor: MATCHED_COLOR,
                    marginRight: 20,
                    marginLeft: 5
                }
            }),
            n('label', 'not matched rule'),
            n('div', {
                style: {
                    display: 'inline-block',
                    width: 18,
                    height: 18,
                    backgroundColor: NOT_MATCHED_COLOR,
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
            matchedRules,
            notMatchedRules
        })))
    ]);
});

let renderRuleNode = view(({
    ruleNode,
    matchedRules,
    notMatchedRules
}) => {
    let {
        nodeType, nodeName
    } = ruleNode;
    nodeName = nodeName && nodeName.toLowerCase();

    if (nodeType === 'imageInnerNode' ||
        nodeType === 3 ||
        nodeName === 'input' ||
        nodeName === 'textarea') {

        let color = contain(matchedRules, ruleNode, {
            eq: sameRuleNode
        }) ? MATCHED_COLOR : contain(notMatchedRules, ruleNode, {
            eq: sameRuleNode
        }) ? NOT_MATCHED_COLOR : null;

        return n('div', [
            renderNode(ruleNode, color),
        ]);
    }
});

let renderNode = (ruleNode, color) => {
    return [
        elementMask(ruleNode, color),
        restoreElement(ruleNode)
    ];
};
let sameRuleNode = (rule1, rule2) => {
    return rule1.id === rule2.id;
};
