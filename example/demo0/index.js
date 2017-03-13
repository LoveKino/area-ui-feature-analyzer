'use strict';

let {
    search
} = require('ui-description-view');

let analyzer = require('../../src');

window.onload = () => {
    let rets = analyzer(document.body, {
        filterOptions: {
            doFilter: 'on',
            rules: ['atom']
        }
    });
    rets.forEach((v) => {
        let nodes = search(document.querySelectorAll('*'), v, {
            gridScope: v.scope
        });

        console.log( // eslint-disable-line
            nodes.length,
            v,
            nodes
        );
    });
};
