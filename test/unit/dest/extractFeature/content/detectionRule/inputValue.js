'use strict';

let {
    getTagName
} = require('../../../util');

let detect = (node) => {
    return getTagName(node) === 'input' || getTagName(node) === 'textarea';
};

let genRules = (value) => {
    return [{
        extractorType: 'inputValue',
        patternType: 'trimEqual',
        pattern: value,
        active: true
    }];
};

let getContent = (node) => {
    return node.value;
};

module.exports = {
    detect,
    genRules,
    getContent
};


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/node_modules/defcomment/src/unit').exportsVariable;
    
})();