import React, { Component } from 'react';
import './App.css';
import ItemFieldEditor from "./TextEditor/ItemFieldEditor";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ItemFieldEditor className='editor' />
      </div>
    );
  }
}

export default App;
