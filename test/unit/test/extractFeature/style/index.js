'use strict';
let cJs = null;
let unit = require('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/node_modules/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];



var testRets = runCases(cases, '/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/test/unit/dest/extractFeature/style/index.js');

if(typeof module === 'object') {
    module.exports = testRets;
}