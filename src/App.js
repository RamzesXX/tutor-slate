import React, { Component } from 'react';
import './App.css';
import TextEditor from "./TextEditor";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TextEditor className='editor' />
      </div>
    );
  }
}

export default App;
