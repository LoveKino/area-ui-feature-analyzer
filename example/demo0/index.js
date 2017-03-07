'use strict';

let {
    search
} = require('ui-description-view');

let analyzer = require('../../src');

window.onload = () => {
    let rets = analyzer(document.body);
    rets.forEach((v) => {
        console.log(
            v,
            search(document.querySelectorAll('*'), v, {
                gridScope: v.scope
            })
        );
    });
};
