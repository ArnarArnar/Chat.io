import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LogIn from './components/LogIn/LogIn/LogIn.js';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <br />
        <LogIn />
      </div>
    );
  }
}

export default App;
