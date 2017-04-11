'use strict';

let {
    getTagName
} = require('../../../util');

let detect = (node) => {
    return getTagName(node) === 'input' || getTagName(node) === 'textarea';
};

let genRules = (placeholder) => {
    if (placeholder === undefined) return;
    // placeholder equal
    return [{
        extractorType: 'placeholder',
        patternType: 'trimEqual',
        pattern: placeholder,
        active: true
    }];
};

let getContent = (node) => {
    let value = node.value;
    let placeholder = node.getAttribute('placeholder') || '';
    if (value) return undefined;
    return placeholder;
};

module.exports = {
    detect,
    getContent,
    genRules
};


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/node_modules/defcomment/src/unit').exportsVariable;
    
})();