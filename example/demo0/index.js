'use strict';

let {
    search
} = require('ui-description-view');

let {
    fetchAreaFeatures, matchMatrix, partition, matchMask
} = require('../../src');

window.onload = () => {
    let filterOptions = {
        doFilter: 'on',
        rules: ['atom']
    };
    let rets = fetchAreaFeatures(document.body, {
        filterOptions
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

    console.log('------------------------');
    let matchInfos = matchMatrix(document.body, rets, {
        filterOptions
    });
    console.log(matchInfos);
    console.log(partition(matchInfos));

    setTimeout(() => {
        document.getElementById('username').value = 'good';
        let {
            matchedNodes, notMatchedNodes
        } = partition(matchMatrix(document.body, rets, {
            filterOptions
        }));

        let {
            showMask
        } = matchMask({
            matchedNodes, notMatchedNodes
        });

        showMask();
    }, 1000);
};
