import React from "react";
import {
    serializeArrayOfNodes,
    deleteChildrenFromNode,
    deserializeArrayOfNodes
} from "../common/Utils";

export const type = 'paragraph';

/**
 * Deserializes 'paragraph' node from CGI format to editor's format
 * @param node
 * @param marks - marks what will be applied on children
 * @returns node's representation for editor
 */
export function deserialize(node, marks) {
    return {
        data: deleteChildrenFromNode(node),
        nodes: deserializeArrayOfNodes(node.children, marks),
        object: 'block',
        type
    };
}

/**
 * Serializes 'paragraph' node with specified type
 *
 * @param node
 * @param carsType
 * @returns {{"@type": *, children: *}}
 */
export function serialize(node, carsType) {
    return {
        ...node.data,
        '@type': carsType,
        children: serializeArrayOfNodes(node.nodes)
    }
}

export function render(props) {
    const {attributes, children} = props;

    return <div {...attributes} className='block-field'>{children}</div>;
}
