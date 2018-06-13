import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate'

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
});

export default class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: initialValue
    };
  }

  onChange = ({ value }) => {
    this.setState({ value })
  };

  render() {
    return <Editor className='editor' value={this.state.value} onChange={this.onChange} />
  }
}
