import React from "react";

export const type = 'text';

/**
 * Deserializes 'text' node and applies marks styles
 * @param node
 * @param marks
 * @returns node's representation for editor
 */
export function deserialize(node, marks) {
    return {
        leaves: [{
            marks: marks,
            object: 'leaf',
            text: node.value,
        }],
        object: 'text',
        type
    };
}

/**
 * Serializes 'text' node with specified type
 *
 * @param node
 * @param carsType
 * @returns {{"@type": *, value: *}}
 */
export function serialize(node, carsType) {
    return {
        '@type': carsType,
        value: node.text
    }
}

export function render(props) {
    const {attributes, children} = props;

    return <span {...attributes} className='inline-field'>{children}</span>;
}
