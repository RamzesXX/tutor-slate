import {Mark} from 'slate'
import {
    serializeArrayOfNodes,
    deleteChildrenFromNode,
    deserializeArrayOfNodes
} from "../common/Utils";

export const type = 'styled-text';

/**
 * Deserializes 'styled-text' node
 *
 * @param node
 * @returns node's representation for editor
 */
export function deserialize(node) {
    const marks = [Mark.createProperties(node.style)];

    return {
        data: deleteChildrenFromNode(node),
        nodes: deserializeArrayOfNodes(node.children, marks),
        object: 'inline',
        type
    };
}

/**
 * Serializes 'styled-text' node with specified type
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
    return props.children;
}
