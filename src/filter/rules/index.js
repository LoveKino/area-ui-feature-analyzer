'use strict';

let atom = require('./atom');
let {
    find
} = require('bolzano');

let ruleMap = {
    'atom': atom
};

/**
 * filterOptions = {
 *    doFilter: 'on',
 *    rules: []
 * }
 */
module.exports = (node, {
    doFilter, rules
} = {}) => {
    if (doFilter === 'on') {
        let passedRule = find(rules, (ruleName) => {
            let rule = ruleMap[ruleName];
            if (rule) {
                return rule(node);
            }
            return false;
        });

        if (passedRule) return true;

        return false;
    } else {
        return true;
    }
};
