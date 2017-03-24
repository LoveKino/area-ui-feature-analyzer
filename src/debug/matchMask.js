'use strict';

let {
    n
} = require('kabanery');

let {
    forEach
} = require('bolzano');

let {
    getBoundRect
} = require('ui-description-view');

module.exports = ({
    matchedNodes, notMatchedNodes
}) => {
    let html = document.getElementsByTagName('html')[0];
    let div = n('div');
    html.appendChild(div);

    let parentNode = div;

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

        parentNode.appendChild(n('div', {
            style: {
                position: 'fixed',
                left,
                top,
                width,
                height,
                zIndex: 10000,
                backgroundColor: 'rgba(222, 222, 222, 1)'
            }
        }));
    });
};

let maskUnMatchedNodes = (notMatchedNodes, parentNode) => {
    forEach(notMatchedNodes, ({
        node
    }) => {
        let {
            left, top, width, height
        } = getBoundRect(node.node);

        parentNode.appendChild(n('div', {
            style: {
                position: 'fixed',
                left,
                top,
                width,
                height,
                zIndex: 10000,
                backgroundColor: 'rgba(0, 53, 64, 0.5)'
            }
        }));
    });
};
