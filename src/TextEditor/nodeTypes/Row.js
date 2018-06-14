import React from "react";
import {
    serializeArrayOfNodes,
    deserializeArrayOfNodes
} from "../common/Utils";

export const type = 'row';

/**
 * Deserializes 'thead' node from CGI format to editor's format
 * @param node
 * @returns node's representation for editor
 */
export function deserialize(node) {
    return {
        isVoid: true,
        nodes: deserializeArrayOfNodes(node.cells),
        object: 'block',
        type
    };
}

/**
 * Serializes 'thead' node with specified type
 *
 * @param node
 * @param carsType
 * @returns {{"@type": *, children: *}}
 */
export function serialize(node, carsType) {
    return {
        '@type': carsType,
        cells: serializeArrayOfNodes(node.nodes)
    }
}

export function render(props) {
    const {attributes, children} = props;

    return <tr {...attributes} className=''>{children}</tr>;
}
