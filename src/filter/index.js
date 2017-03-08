'use strict';

let {
    reduce
} = require('bolzano');

let {
    getBoundRect,
    ImageInnerNode
} = require('ui-description-view');

/**
 * filter the "important" nodes from area.
 *
 * TODO add filter rules, like filter useless container (how to defined?)
 */

let filter = (topNode, filterOptions) => {
    let rets = [];

    if (topNode.nodeType !== 1 ||
        topNode.nodeType !== 3 ||
        topNode.nodeType !== 'imageInnerNode') {
        return rets;
    }

    let importance = calImportance(topNode);
    if (importance) {
        rets.push({
            node: topNode,
            importance
        });
    }

    if (topNode.tagName && topNode.tagName.toLowerCase() === 'img') {
        rets.push({
            node: new ImageInnerNode(topNode),
            importance
        });
    }

    return reduce(topNode.childNodes, (prev, child) => {
        return prev.concat(filter(child));
    }, rets);
};

// TODO
let calImportance = (node) => {
    let rect = getBoundRect(node);
    if (!rect.width || !rect.height) return 0;
    return 1;
};

module.exports = filter;
