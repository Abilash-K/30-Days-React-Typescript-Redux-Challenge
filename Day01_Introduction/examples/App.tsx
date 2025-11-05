import React from 'react';
import Welcome from './Welcome';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React + TypeScript</h1>
        <Welcome name="Developer" age={25} />
        <Welcome name="Student" />
      </header>
    </div>
  );
}

export default App;
