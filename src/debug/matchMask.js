'use strict';

let {
    n, mount
} = require('kabanery');

let {
    forEach
} = require('bolzano');

let {
    getBoundRect
} = require('ui-description-view');

/**
 * overlay a mask to current page to show which parts are matched, which parts are not matched
 */
module.exports = ({
    matchedNodes, notMatchedNodes
}) => {
    let html = document.getElementsByTagName('html')[0];
    let div = n('div id="area-ui-feature-match-mask"');
    mount(div, html);

    let parentNode = document.getElementById('area-ui-feature-match-mask');

    if (div.createShadowRoot) {
        let sr = div.createShadowRoot();
        sr.innerHTML = '<div id="root"></div>';

        parentNode = sr.getElementById('root');
    }

    let showMask = () => {
        maskMatchedNodes(matchedNodes, parentNode);
        maskUnMatchedNodes(notMatchedNodes, parentNode);
    };

    let closeMask = () => {
        div.parentNode.removeChild(div);
    };

    return {
        showMask,
        closeMask
    };
};

let maskMatchedNodes = (matchedNodes, parentNode) => {
    forEach(matchedNodes, ({
        node
    }) => {
        let {
            left, top, width, height
        } = getBoundRect(node.node);

        mount(n('div', {
            style: {
                position: 'fixed',
                left,
                top,
                width,
                height,
                zIndex: 10000,
                backgroundColor: 'rgba(222, 222, 222, 1)'
            }
        }), parentNode);
    });
};

let maskUnMatchedNodes = (notMatchedNodes, parentNode) => {
    forEach(notMatchedNodes, ({
        node
    }) => {
        let {
            left, top, width, height
        } = getBoundRect(node.node);

        mount(n('div', {
            style: {
                position: 'fixed',
                left,
                top,
                width,
                height,
                zIndex: 10000,
                backgroundColor: 'rgba(0, 53, 64, 0.5)'
            }
        }), parentNode);
    });
};
