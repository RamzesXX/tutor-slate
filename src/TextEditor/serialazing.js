import { Mark } from 'slate'

const AT_TYPE='@type';

const typeToProcessorMapping = {
  'text': {
    carsType: 'soa::v2::common::text',
    deserializer: deserializeTextNode,
    serializer: serializeTextNode,
  },
  'styled-text': {
    carsType: 'soa::v2::cars::styled-text',
    deserializer: deserializeStyledTextNode,
    serializer: serializeStyledTextNode,
  },
  'paragraph': {
    carsType: 'soa::v2::cars::paragrap',
    deserializer: deserializeParagraphNode,
    serializer: serializeParagraphNode,
  },
  'complex-media': {
    carsType: 'soa::v2::cars::complex-media',
    deserializer: deserializeComplexMediaNode,
    serializer: serializeComplexMediaNode,
  }
};

export function parseType(fullTypeName) {
  if (fullTypeName) {
    const index = fullTypeName.lastIndexOf('::');
    const type = index > -1 ? fullTypeName.substr(index + 2) : fullTypeName;
    const namespace = index > -1 ? fullTypeName.substr(0, index) : '';

    return { namespace, type };
  }

  return undefined;
}

export function getTypeFromNode(node) {
    const fullTypeName = node[AT_TYPE];

    return fullTypeName && parseType(fullTypeName);
}


export function deserializeArrayOfNodes(nodeList, marks) {
  return nodeList.map((node) => deserializeNode(node, marks));
}

export function serializeArrayOfNodes(nodeList) {
  return nodeList.map((node) => serializeNode(node));
}

export function deserializeNodeWithChildren(node, marks) {
  return deserializeArrayOfNodes(node.children, marks);
}

export function deserializeNode(node, marks) {
  const parsedType = getTypeFromNode(node);
  const typeProcessors = typeToProcessorMapping[parsedType.type];

  if (typeProcessors) {
    return typeProcessors.deserializer(node, marks);
  }

  //no processor for node
}

export function serializeNode(node) {
  if (Array.isArray(node)) {
    return node.map(serializeNode);
  }

  const typeProcessors = typeToProcessorMapping[node.type];

  if (typeProcessors) {
    return typeProcessors.serializer(node, typeProcessors.carsType);
  }

  //no processor for node
}

/**
 * Deserializes 'text' node and applys marks styles
 * @param node
 * @param marks
 * @returns node's representation for editor
 */
function deserializeTextNode(node, marks) {
  return {
    leaves: [{
      marks: marks,
      object: 'leaf',
      text: node.value,
    }],
    object: 'text',
    type: 'text'
  };
}

/**
 * Serializes 'text' node with specified type
 *
 * @param node
 * @param type
 * @returns {{"@type": *, value: *}}
 */
function serializeTextNode(node, type) {
  return {
    '@type': type,
    value: node.text
  }
}

/**
 * Deserializes 'styled-text' node
 * @param node
 * @returns node's representation for editor
 */
function deserializeStyledTextNode(node) {
  const marks = [Mark.createProperties(node.style)];

  return {
    data: {
      color: node.color,
      highlight: node.highlight,
      language: node.language,
      role: node.role,
      style: node.style
    },
    nodes: deserializeNodeWithChildren(node, marks),
    object: 'inline',
    type: 'styled-text'
  };
}

/**
 * Serializes 'styled-text' node with specified type
 *
 * @param node
 * @param type
 * @returns {{"@type": *, children: *}}
 */
function serializeStyledTextNode(node, type) {
  return {
    ...node.data,
    '@type': type,
    children: node.nodes.map(serializeNode)
  }
}

/**
 * Deserializes 'styled-text' node
 * @param node
 * @returns node's representation for editor
 */
function deserializeComplexMediaNode(node) {
  return {
    data: {
      labels: node.labels,
      media: node.media,
      showTranslationLabel: node.showTranslationLabel,
      type: node.type
    },
    isVoid: true,
    nodes: [],
    object: 'block',
    type: 'complex-media'
  };
}

/**
 * Serializes 'styled-text' node with specified type
 *
 * @param node
 * @param type
 * @returns {{"@type": *, children: *}}
 */
function serializeComplexMediaNode(node, type) {
  return {
    ...node.data,
    '@type': type
  }
}


/**
 * Deserializes 'paragraph' node
 * @param node
 * @param marks - marks waht will be applied on children
 * @returns node's representation for editor
 */
function deserializeParagraphNode(node, marks) {
  return {
    data: {
      language: node.language,
    },
    nodes: deserializeNodeWithChildren(node, marks),
    object: 'block',
    type: 'paragraph'
  };
}

/**
 * Serializes 'paragraph' node with specified type
 *
 * @param node
 * @param type
 * @returns {{"@type": *, children: *}}
 */
function serializeParagraphNode(node, type) {
  return {
    ...node.data,
    '@type': type,
    children: node.nodes.map(serializeNode)
  }
}

