import {
    serializeArrayOfNodes,
    deserializeArrayOfNodes
} from "../common/Utils";

export const type = 'tbodys';

/**
 * Deserializes 'tbodys' node from CGI format to editor's format
 *
 * @param nodes
 * @returns node's representation for editor
 */
export function deserialize(nodes) {
    return {
        isVoid: true,
        nodes: deserializeArrayOfNodes(nodes),
        object: 'block',
        type
    };
}

/**
 * Serializes 'caption' node with specified type
 *
 * @param node
 * @returns {{"@type": *, children: *}}
 */
export function serialize(node) {
    return serializeArrayOfNodes(node.nodes);
}

export function render(props) {
    return props.children;
}
