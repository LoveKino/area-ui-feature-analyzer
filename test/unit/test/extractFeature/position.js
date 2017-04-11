'use strict';
let cJs = require('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/test/unit/dest/extractFeature/position.js'); // require source code
let unit = require('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/node_modules/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

cases.push(
    it('/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/test/unit/dest/extractFeature/position.js', {"test":"","tar":"function"},
         'getPositionArea',
         "[\n   [\n     [\n         {\n             left: 60,\n             top: 797,\n             width: 14,\n             height: 32,\n             bottom: 859,\n             right: 74\n         },\n         {\n             scope: {\n                 width:1200,\n                 height: 874,\n                 x: 0,\n                 y: 0\n             },\n\n             rectBlurRatio: 1.5,\n\n             minGridWidth: 0,\n             minGridHeight: 0\n         }\n     ],\n\n     {\n     }\n   ]\n]",
         [
   [
     [
         {
             left: 60,
             top: 797,
             width: 14,
             height: 32,
             bottom: 859,
             right: 74
         },
         {
             scope: {
                 width:1200,
                 height: 874,
                 x: 0,
                 y: 0
             },

             rectBlurRatio: 1.5,

             minGridWidth: 0,
             minGridHeight: 0
         }
     ],

     {
     }
   ]
],
         cJs)
);

var testRets = runCases(cases, '/Users/yuer/workspaceforme/category/career/container/common/ui/area-ui-feature-analyzer/test/unit/dest/extractFeature/position.js');

if(typeof module === 'object') {
    module.exports = testRets;
}