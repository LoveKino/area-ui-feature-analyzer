'use strict';

let {
    reduce
} = require('bolzano');

let {
    getBoundRect,
    ImageInnerNode
} = require('ui-description-view');

let filterRules = require('./rules');

/**
 * filter the "important" nodes from area.
 *
 * TODO add filter rules, like filter useless container (how to defined?)
 */

let filter = (topNode, filterOptions) => {
    let rets = [];

    if (topNode.nodeType !== 1 &&
        topNode.nodeType !== 3 &&
        topNode.nodeType !== 'imageInnerNode') {
        return rets;
    }

    if (filterRules(topNode, filterOptions)) {
        let importance = calImportance(topNode, filterOptions);

        if (importance) {
            rets.push({
                node: topNode,
                importance
            });

            if (topNode.tagName && topNode.tagName.toLowerCase() === 'img') {
                rets.push({
                    node: new ImageInnerNode(topNode),
                    importance
                });
            }
        }
    }

    return reduce(topNode.childNodes, (prev, child) => {
        return prev.concat(filter(child, filterOptions));
    }, rets);
};

// TODO
let calImportance = (node/*, filterOptions*/) => {
    let rect = getBoundRect(node);
    if (!rect.width || !rect.height) return 0;
    return 1;
};

module.exports = filter;


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/node_modules/defcomment/src/unit').exportsVariable;
    
})();