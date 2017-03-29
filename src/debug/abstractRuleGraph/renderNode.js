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
            width: hackTextWidth(ruleNode.nodeType, width),
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
        left, top, width, height, leftOffset = 0
    } = position[2][0];

    let styles = mergeMap({
        position: 'absolute',
        left,
        top,
        width: hackTextWidth(nodeType, width),
        height,
        textAlign: 'left'
    }, styleMap);

    let borderedStyles = mergeMap({
        position: 'absolute',
        left,
        top,
        padding: 0,
        margin: 0,
        width: hackTextWidth(nodeType, width) - 1,
        height: height - 1,
        'border-width': 1,
        textAlign: 'left'
    }, styleMap);

    if (nodeType === 3) {
        return n('div', {
            style: styles
        }, [
            n('div', { // solve the multiple lines problem
                style: {
                    display: 'inline-block',
                    width: leftOffset
                }
            }), n('span', contentMap.textNode)
        ]);
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

let hackTextWidth = (nodeType, width) => nodeType === 3 ? width + 20 : width;

module.exports = renderNode;
