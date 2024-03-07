import React from 'react';
import './App.css';
import Button from './components/Button';
import List from './components/List';

function App() {
  return (
    <div className="container">
      <h1 className="title">Calculator</h1>

      <div className="content">
        <Button />
        <List />
      </div>
    </div>
  );
}

export default App;
