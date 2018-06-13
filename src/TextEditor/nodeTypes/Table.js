import React from "react";
import {
    serializeNode,
    deserializeNode
} from "../common/Utils";
import * as Tbodys from './Tbodys';
export const type = 'table';

/**
 * Deserializes 'paragraph' node from CGI format to editor's format
 * @param node
 * @param marks - marks what will be applied on children
 * @returns node's representation for editor
 */
export function deserialize(node) {
    const table = [];

    if (node.caption) {
        table.push(deserializeNode(node.caption));
    }

    if (node.thead) {
        table.push(deserializeNode(node.thead));
    }

    if (node.tbodys) {
        table.push(Tbodys.deserialize(node.tbodys));
    }

    if (node.tfoot) {
        table.push(deserializeNode(node.tfoot));
    }

    return {
        data: node.language && { language:node.language },
        isVoid: true,
        nodes: table,
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
    const table = {};

    node.nodes.forEach((item) => {
            const tpart = serializeNode(item);

            if (tpart) {
                table[item.type] = tpart;
            }
        }
    );

    return {
        ...node.data,
        ...table,
        '@type': carsType,
    }
}

export function render(props) {
    const {attributes, children} = props;

    return <table {...attributes} className=''>{children}</table>;
}
