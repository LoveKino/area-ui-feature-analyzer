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
    onChooseRuleNode,
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
            notMatchedRules,
            onChooseRuleNode
        })))
    ]);
});

let renderRuleNode = view(({
    ruleNode,
    matchedRules,
    notMatchedRules,
    onChooseRuleNode
}) => {
    let {
        nodeType, nodeName
    } = ruleNode;
    nodeName = nodeName && nodeName.toLowerCase();

    if (nodeType === 'imageInnerNode' ||
        nodeType === 3 ||
        nodeName === 'input' ||
        nodeName === 'textarea') {

        let matchType = contain(matchedRules, ruleNode, {
            eq: sameRuleNode
        }) ? 'matched' : contain(notMatchedRules, ruleNode, {
            eq: sameRuleNode
        }) ? 'notmatched' : null;

        return n('div', [
            renderNode(ruleNode, matchType, onChooseRuleNode),
        ]);
    }
});

let renderNode = (ruleNode, matchType, onChooseRuleNode) => {
    let color = matchType === 'matched' ? MATCHED_COLOR : matchType === 'notmatched' ? NOT_MATCHED_COLOR : null;

    return n('div', {
        onclick: () => {
            onChooseRuleNode && onChooseRuleNode(ruleNode, matchType);
        }
    }, [
        elementMask(ruleNode, color),
        restoreElement(ruleNode)
    ]);
};

let sameRuleNode = (rule1, rule2) => {
    return rule1.id === rule2.id;
};


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/node_modules/defcomment/src/unit').exportsVariable;
    
})();