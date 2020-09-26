import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopicBox from './Components/TopicBox';

function App() {
  let a = 9;

  return (
    <div className="App">
      <header className="App-header">
        <TopicBox title="Local Politics" />
        <TopicBox title="Regional Politics"/>
        <TopicBox title="Global Politics" />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit {a} <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
