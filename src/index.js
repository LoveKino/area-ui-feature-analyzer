'use strict';

let {
    map, mergeMap
} = require('bolzano');

/**
 * analysis area to get some UI features
 *
 * 1. filter all nodes in the area and pick up some "important" nodes
 *
 * 2. extract "appropriate" features for those "important" nodes.
 */

let filter = require('./filter');
let extractFeature = require('./extractFeature');

module.exports = (topNode, {
    filterOptions, featureOptions
} = {}) => {
    return map(
        filter(topNode, filterOptions),

        ({
            node, importance
        }) => {
            return mergeMap({
                importance, node
            }, extractFeature(node, featureOptions));
        });
};
