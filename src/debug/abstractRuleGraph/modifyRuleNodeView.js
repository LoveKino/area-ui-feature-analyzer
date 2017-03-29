'use strict';

let {
    n, view
} = require('kabanery');

let {
    modal
} = require('kabanery-modal');

let {
    udView
} = require('ui-description-view');


let Fold = require('kabanery-fold');
let FoldArrow = require('kabanery-fold/lib/foldArrow');

module.exports = view(({
    ruleNode,
    onIgnore,
    onUpgrade
}) => {
    return modal({
        content: n('div', {
            style: {
                backgroundColor: 'white',
                textAlign: 'left',
                minWidth: 400,
                padding: 10
            }
        }, [
            Fold({
                head: (ops) => n('div', {
                    style: {
                        cursor: 'point'
                    },
                    onclick: () => {
                        ops.toggle();
                    }
                }, [
                    FoldArrow(ops),
                    n('span', 'rule content'),

                    n('button', {
                        onclick: (e) => {
                            e.stopPropagation();
                            onIgnore && onIgnore(ruleNode);
                        }
                    }, 'ignore'),

                    n('button', {
                        onclick: (e) => {
                            e.stopPropagation();
                            onUpgrade && onUpgrade(ruleNode);
                        }
                    }, 'upgrade')
                ]),

                body: () => [
                    udView(ruleNode)
                ]
            })
        ]),

        autoHide: true
    });
});
