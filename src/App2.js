// src/App.js
import React from 'react';
import './App.css';
import Quiz from './Quiz'; // Adjust the path if Quiz.js is in a different directory

function App2() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz Application</h1>
      </header>
      <main>
        <Quiz />
      </main>
    </div>
  );
}

export default App2;
