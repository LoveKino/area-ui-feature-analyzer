'use strict';

let {
    fetchAreaFeatures, matchMatrix, partition, ruleMatchMask
} = require('../../src');

let {
    mount
} = require('kabanery');

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

        mount(mask, document.getElementById('rule-mask'));
    }, 1000);
};
