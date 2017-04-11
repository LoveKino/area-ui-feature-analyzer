'use strict';

let {
    contain
} = require('bolzano');

/**
 * only atom node
 */
module.exports = (node) => {
    if (node.nodeType === 3) return true;
    if (node.nodeType === 'imageInnerNode') return true;
    if (node.nodeType === 1) {
        if (contain(['input', 'textarea', 'button', 'img', 'select', 'option'], node.nodeName.toLowerCase())) {
            return true;
        }
    }

    return false;
};


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/node_modules/defcomment/src/unit').exportsVariable;
    
})();