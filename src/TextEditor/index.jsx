import React, {Component} from 'react';
import {Editor} from 'slate-react';
import {Value} from 'slate'
import {deserializeArrayOfNodes, serializeArrayOfNodes} from './serialazing'
import {getMediaElement} from "./helpers";

const example = require('./fixture');
const json = {
  document: {
    data: {},
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: deserializeArrayOfNodes(example)
      }],
    object: 'document',
  },
  object: 'value'
};

const initialValue = Value.fromJSON(json);

export default class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: initialValue
    };
  }

  onChange = ({value}) => {

    console.log(serializeArrayOfNodes(value.getIn(['document', 'nodes']).toJS()));
    this.setState({value})
  };

  renderMark({ children, mark }) {
    switch (mark.type) {
      case 'strong':
        return <strong>{children}</strong>;
      case 'emphasis':
        return <em>{children}</em>;
      case 'underscore':
        return <u>{children}</u>;
      case 'strikethrough':
        return <strike>{children}</strike>;
      default:
        break;
    }
  }

  renderNode(props) {
    const { attributes, children, node } = props;
    const Tag = node.object === 'block' ? 'div' : 'span';
    const className = node.type === 'paragraph' ? 'block-field' : 'inline-field';

    switch (node.type) {
      case 'complex-media':
        return getMediaElement(node.data.get('media').mediaType, node.data.get('media').cgiRef);
      default:
        return (
            <Tag {...attributes} className={className}>
              {children}
            </Tag>
        );
    }
  }

  render() {
    return <Editor
        className='editor'
        value={this.state.value}
        onChange={this.onChange}
        renderMark={this.renderMark}
        renderNode={this.renderNode}
    />
  }
}
