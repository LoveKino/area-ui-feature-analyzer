'use strict';

let {
    reduce, mergeMap
} = require('bolzano');
let {
    isString
} = require('basetype');
let rules = require('./detectionRule');

/**
 * contentRule = [ruleName]
 *
 * ruleName: string
 */
let genContentDetectionRules = (node, {
    contentRules = ['imgUrl', 'inputValue', 'placeholder', 'textNode'], customContentRules = {}
} = {}) => {
    rules = mergeMap(rules, customContentRules);

    return reduce(contentRules, (prev, item) => {
        let rule = null;
        if (isString(item)) {
            rule = rules[item];
        }

        if (rule) {
            let {
                detect, getContent, genRules
            } = rule;

            if (detect(node)) {
                let cnt = getContent(node);
                prev.contentMap[item] = cnt;

                prev.rules = prev.rules.concat(genRules(cnt) || []);
            }
        }

        return prev;
    }, {
        rules: [],
        contentMap: {}
    });
};

module.exports = {
    genContentDetectionRules
};
