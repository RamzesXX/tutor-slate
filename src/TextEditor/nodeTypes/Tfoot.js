import React from "react";
import {
    serializeArrayOfNodes,
    deserializeArrayOfNodes
} from "../common/Utils";

export const type = 'tfoot';

/**
 * Deserializes 'caption' node from CGI format to editor's format
 * @param node
 * @param marks - marks what will be applied on children
 * @returns node's representation for editor
 */
export function deserialize(node, marks) {
    return {
        isVoid: true,
        nodes: deserializeArrayOfNodes(node.rows, marks),
        object: 'block',
        type
    };
}

/**
 * Serializes 'caption' node with specified type
 *
 * @param node
 * @param carsType
 * @returns {{"@type": *, children: *}}
 */
export function serialize(node, carsType) {
    return {
        '@type': carsType,
        rows: serializeArrayOfNodes(node.nodes)
    }
}

export function render(props) {
    const {attributes, children} = props;

    return <tfoot {...attributes} className=''>{children}</tfoot>;
}
