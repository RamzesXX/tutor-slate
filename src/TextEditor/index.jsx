import React, {Component} from 'react';
import {Editor} from 'slate-react';
import {Value} from 'slate'
import {
    serializeArrayOfNodes,
    deserializeArrayOfNodes,
    render
} from "./common/Utils";

const example = require('./fixture');
const json = {
    document: {
        data: {},
        nodes: [
            {
                object: 'block',
                type: 'fake',
                nodes: deserializeArrayOfNodes(example)
            }],
        object: 'document',
    },
    object: 'value'
};
console.log(json);
const initialValue = Value.fromJSON(json);

export default class TextEditor extends Component {
    onChange = ({value}) => {

        // console.log(serializeArrayOfNodes(value.getIn(['document', 'nodes']).toJS()));
        this.setState({value})
    };

    constructor(props) {
        super(props);

        this.state = {
            value: initialValue
        };
    }

    renderMark({children, mark}) {
        switch (mark.type) {
            case 'strong':
                return <strong>{children}</strong>;
            case 'emphasis':
                return <em>{children}</em>;
            case 'underscore':
                return <u>{children}</u>;
            case 'strikethrough':
                return <del>{children}</del>;
            default:
                break;
        }
    }

    renderNode(props) {
        return render(props);
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
