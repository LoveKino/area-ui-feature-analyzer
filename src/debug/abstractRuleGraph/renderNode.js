'use strict';

let {
    n
} = require('kabanery');
let {
    mergeMap
} = require('bolzano');

let {
    IGNORE_COLOR, UPGRADE_COLOR
} = require('./const');

let renderNode = (ruleNode, options, editResult) => {
    let {
        left, top, width, height
    } = ruleNode.position[2][0];

    return [n('div', mergeMap({
        style: {
            position: 'absolute',
            left,
            top,
            width,
            height,
            cursor: 'pointer',
            backgroundColor: editResult && editResult.type === 'ignore' ? IGNORE_COLOR : editResult && editResult.type === 'upgrade' ? UPGRADE_COLOR : null,
            zIndex: (ruleNode.styleMap.index || 0) + 100
        }
    }, options)), restoreElement(ruleNode)];
};

let restoreElement = ({
    contentMap, styleMap, nodeType, position, nodeName
}) => {
    nodeName = nodeName && nodeName.toLowerCase();

    let {
        left, top, width, height
    } = position[2][0];

    let styles = mergeMap({
        position: 'absolute',
        left,
        top,
        width,
        height
    }, styleMap);

    let borderedStyles = mergeMap({
        position: 'absolute',
        left,
        top,
        padding: 0,
        margin: 0,
        width: width - 1,
        height: height - 1,
        'border-width': 1
    }, styleMap);

    if (nodeType === 3) {
        return n('div', {
            style: styles
        }, contentMap.textNode);
    } else if (nodeType === 'imageInnerNode') {
        return n(`img src="${contentMap.imgUrl}"`, {
            style: styles
        });
    } else if (nodeName === 'input') {
        return n(nodeName, {
            style: borderedStyles,
            placeholder: contentMap.placeholder || '',
            value: contentMap.inputValue || ''
        });
    } else if (nodeName === 'textarea') {
        return n(nodeName, {
            style: borderedStyles,
            placeholder: contentMap.placeholder || '',
        }, [contentMap.inputValue || '']);
    }
};

module.exports = renderNode;
