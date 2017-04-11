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
    editResult,
    ruleNode,
    onIgnore,
    onUpgrade
}) => {
    let doCancelIgnore = editResult && editResult.type === 'ignore';
    let doCancelUpgrade = editResult && editResult.type === 'upgrade';

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
                            onIgnore && onIgnore(ruleNode, doCancelIgnore);
                        }
                    }, doCancelIgnore ? 'cancel ignore' : 'ignore'),

                    n('button', {
                        onclick: (e) => {
                            e.stopPropagation();
                            onUpgrade && onUpgrade(ruleNode, doCancelUpgrade);
                        }
                    }, doCancelUpgrade ? 'cancel upgrade' : 'upgrade')
                ]),

                body: () => [
                    udView(ruleNode)
                ]
            })
        ]),

        autoHide: true
    });
});


!(function () {
    var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/node_modules/defcomment/src/unit').exportsVariable;
    
})();