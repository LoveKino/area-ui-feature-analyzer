'use strict';

let {
    map, mergeMap
} = require('bolzano');
let filter = require('./filter');
let extractFeature = require('./extractFeature');
let {
    matchMatrix, partition
} = require('./match');
let matchMask = require('./debug/matchMask');

/**
 * analysis area to get some UI features
 *
 * 1. filter all nodes in the area and pick up some "important" nodes
 *
 * 2. extract "appropriate" features for those "important" nodes.
 */

let fetchAreaFeatures = (topNode, {
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

module.exports = {
    fetchAreaFeatures,
    matchMatrix,
    partition,
    matchMask
};
