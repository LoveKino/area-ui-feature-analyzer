'use strict';

let {
    fetchAreaFeatures, abstractRuleGraph
} = require('../../src');

window.onload = () => {
    let filterOptions = {
        doFilter: 'on',
        rules: ['atom']
    };

    let ruleNodes = fetchAreaFeatures(document.body, {
        filterOptions
    });

    document.getElementById('abs-rule').appendChild(
        abstractRuleGraph({
            ruleNodes,
            width: 300,
            height: 500
        })
    );
};
