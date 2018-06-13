import Immutable from "immutable";

const typeToProcessorMapping = {
  'text': {
    carsType: 'soa::v2::common::text',
    deserializer: deserializeTextNode,
    serializer: serializeTextNode,
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
  if (Immutable.Map.isMap(node)) {
    const fullTypeName = node.get(AT_TYPE);

    return fullTypeName && parseType(fullTypeName);
  }

  return undefined;
}


function deserializeNode(node) {
  const parsedType = getTypeFromNode(node);
  const type = typeToProcessorMapping[parsedType.type];

  node.get('value');
}

function serializeNode(node) {
  type = typeToProcessorMapping[type];

  node.get('value');
}

function deserializeTextNode(node) {
  node.get('value');
}

function serializeTextNode(node, type) {
  return {
    '@type': type,
    value: node.text
  }
}
