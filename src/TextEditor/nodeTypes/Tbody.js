import React from "react";
import {
    serializeArrayOfNodes,
    deserializeArrayOfNodes
} from "../common/Utils";

export const type = 'tbody';

/**
 * Deserializes 'tbody' node from CGI format to editor's format
 *
 * @param node
 * @returns node's representation for editor
 */
export function deserialize(node) {
    return {
        isVoid: true,
        nodes: deserializeArrayOfNodes(node.rows),
        object: 'block',
        type
    };
}

/**
 * Serializes 'tbody' node with specified type
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

    return <tbody {...attributes} className=''>{children}</tbody>;
}
