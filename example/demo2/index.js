'use strict';

let {
    fetchAreaFeatures, matchMatrix, partition, ruleMatchMask
} = require('../../src');

window.onload = () => {
    let filterOptions = {
        doFilter: 'on',
        rules: ['atom']
    };
    let ruleNodes = fetchAreaFeatures(document.body, {
        filterOptions
    });

    setTimeout(() => {
        document.getElementById('username').value = 'good';
        let {
            matchedRules, notMatchedRules
        } = partition(matchMatrix(document.body, ruleNodes, {
            filterOptions
        }));

        let mask = ruleMatchMask({
            matchedRules,
            notMatchedRules,
            ruleNodes,
            onChooseRuleNode: (ruleNode, matchType) => {
                console.log(ruleNode, matchType);
            }
        });

        document.getElementById('rule-mask').appendChild(mask);
    }, 1000);
};
