'use strict';

let filterNodes = require('../filter');
let {
    collectMatchInfos
} = require('ui-description-view');
let {
    any, reduce, filter, map, deRepeat, difference
} = require('bolzano');

/**
 * match area with some rules
 *
 * result matrix
 *
 * eg: only for atom elements
 */
let matchMatrix = (tarTopNode, rules, {
    filterOptions
} = {}) => {
    let nodes = filterNodes(tarTopNode, filterOptions);

    let matrix = [];

    for (let i = 0; i < nodes.length; i++) {
        let {
            node
        } = nodes[i];
        matrix[i] = [];

        for (let j = 0; j < rules.length; j++) {
            let ruleNode = rules[j];
            let matchInfo = collectMatchInfos(node, ruleNode, {
                gridScope: ruleNode.scope
            });
            matrix[i][j] = {
                matchInfo, ruleNode
            };
        }
    }

    return {
        nodes, matrix, rules
    };
};

/**
 * analysis matching matrix for current area according to some rules:
 *
 * 1. some nodes of area mached.
 * 2. some rule are not mached.
 * 3. some nodes of area are not mached.
 */

let partition = ({
    nodes, matrix, rules
}, matchRule = strictMatchRule) => {
    // split the nodes matched and not matched
    let [matchedNodes, notMatchedNodes] = reduce(nodes, ([matchedNodes, notMatchedNodes], node, index) => {
        let matchInfos = matrix[index];
        let matchedRules = matchRule(matchInfos);
        if (matchedRules && matchedRules.length) {
            matchedNodes.push({
                node,
                index,
                matchedRules
            });
        } else {
            notMatchedNodes.push({
                node,
                index,
                matchedRules
            });
        }

        return [matchedNodes, notMatchedNodes];
    }, [
        [],
        []
    ]);

    // find matched rules
    let matchedRules = reduce(matchedNodes, (prev, {
        matchedRules
    }) => {
        return prev.concat(matchedRules);
    }, []);

    matchedRules = deRepeat(matchedRules);

    return {
        matchedNodes,
        notMatchedNodes,
        matchedRules,
        notMatchedRules: difference(rules, matchedRules)
    };
};

let strictMatchRule = (matchInfos) => {
    // exist rule matched
    return map(filter(matchInfos, ({
        matchInfo
    }) => {
        let {
            position, content, style
        } = matchInfo;
        return position[0] && any(content, (item) => item[0]) && any(style, (item) => item[0]);
    }), ({
        ruleNode
    }) => {
        return ruleNode;
    });
};

module.exports = {
    matchMatrix,
    partition
};
