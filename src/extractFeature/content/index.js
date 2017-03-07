'use strict';

let {
    reduce
} = require('bolzano');
let {
    isString, isObject
} = require('basetype');
let rules = require('./detectionRule');

/**
 * contentRule = [ruleName]
 *
 * ruleName: string | object
 */
let genContentDetectionRules = (node, {
    contentRules = ['imgUrl', 'placeholder', 'textNode']
} = {}) => {
    return reduce(contentRules, (prev, item) => {
        let rule = null;
        if (isString(item)) {
            rule = rules[item];
        } else if (isObject(item)) {
            rule = item;
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
