import React from 'react';
import * as Text from '../nodeTypes/Text';
import * as StyledText from '../nodeTypes/StyledText';
import * as Paragraph from '../nodeTypes/Paragraph';
import * as ComplexMedia from '../nodeTypes/ComplexMedia';
import * as Table from '../nodeTypes/Table';
import * as Tfoot from '../nodeTypes/Tfoot';
import * as Tbody from '../nodeTypes/Tbody';
import * as Tbodys from '../nodeTypes/Tbodys';
import * as Thead from '../nodeTypes/Thead';
import * as Cell from '../nodeTypes/Cell';
import * as Caption from '../nodeTypes/Caption';
import * as Row from '../nodeTypes/Row';

const AT_TYPE = '@type';

const supportedNodeTypes = [
    Caption,
    Cell,
    ComplexMedia,
    Paragraph,
    Row,
    StyledText,
    Table,
    Text,
    Thead,
    Tbody,
    Tbodys,
    Tfoot
];

const typeToProcessorMapping = {};

supportedNodeTypes.forEach((nodeType) => {
    typeToProcessorMapping[nodeType.type] = { ...nodeType, carsType: nodeType.type };
});

export function deleteChildrenFromNode(node) {
    const nodeWithoutChildren = {...node};
    delete nodeWithoutChildren.children;

    return nodeWithoutChildren;
}

/**
 * Parse @type from string 'namespace::type'
 *   for unparseable string empty object is returned
 *
 * @param fullTypeName
 * @returns Object with namespace and type properties
 */
export function parseType(fullTypeName) {
    if (fullTypeName) {
        const index = fullTypeName.lastIndexOf('::');
        const type = index > -1 ? fullTypeName.substr(index + 2) : fullTypeName;
        const namespace = index > -1 ? fullTypeName.substr(0, index) : '';

        return {namespace, type};
    }

    return {};
}

/**
 * Get type info from cars node
 *
 * @param node
 * @returns Object with namespace and type properties
 */
export function getTypeFromNode(node) {
    const fullTypeName = node[AT_TYPE];

    return parseType(fullTypeName);
}

/**
 * Deserializes array of nodes from CGI format to editor's format
 *  and applies marks to each child
 *  all nodes with unsupported types are removed from array
 *
 * @param nodeList
 * @param marks
 * @returns array of deserialized nodes
 */
export function deserializeArrayOfNodes(nodeList, marks) {
    return nodeList.map((node) => deserializeNode(node, marks)).filter((value) => value);
}

/**
 * Serializes array of nodes from editor's format to CGI format
 *  all unsupported types are removed from array
 * @param nodeList
 * @returns array of serialized nodes
 */
export function serializeArrayOfNodes(nodeList) {
    return nodeList.map((node) => serializeNode(node)).filter((value) => value);
}


/**
 * Deserializes node from CGI format to editor's format
 *      and applies marks to it
 * @param node
 * @param marks
 * @returns {node}
 */
export function deserializeNode(node, marks) {
    const parsedType = getTypeFromNode(node);
    const typeProcessors = typeToProcessorMapping[parsedType.type];

    if (typeProcessors) {
        return typeProcessors.deserialize(node, marks);
    }

    //no processor for node
}

/**
 * Serializes node from editor's format to CGI format
 *
 * @param node
 * @returns serialized node
 */
export function serializeNode(node) {
    if (Array.isArray(node)) {
        return serializeArrayOfNodes(node);
    }

    const typeProcessors = typeToProcessorMapping[node.type];

    if (typeProcessors) {
        return typeProcessors.serialize(node, typeProcessors.carsType);
    }

    //no processor for node
}

export function render(props) {
    const {attributes, children, node} = props;
    const typeProcessors = typeToProcessorMapping[node.type];
    const Tag = node.object === 'block' ? 'div' : 'span';
    const className = node.object === 'block' ? 'block-field' : 'inline-field';

    if (typeProcessors) {
        return typeProcessors.render(props);
    }

    return (
        <Tag {...attributes} className={className} qqqqq='11111111'>
            {children}
        </Tag>
    );
}
