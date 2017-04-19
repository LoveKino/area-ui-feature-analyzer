'use strict';

let {
    fetchAreaFeatures, abstractRuleGraph
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

    mount(
        abstractRuleGraph({
            ruleNodes,
            width: 300, height: 500
        }),

        document.getElementById('abs-rule')
    );
};
