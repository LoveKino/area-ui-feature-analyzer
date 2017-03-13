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
                detect, genRules
            } = rule;
            if (detect(node)) {
                prev = prev.concat(genRules(node) || []);
            }
        }

        return prev;
    }, []);
};

module.exports = {
    genContentDetectionRules
};
