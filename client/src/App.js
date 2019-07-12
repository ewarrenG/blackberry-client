import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{

  constructor(){
    super();
  }

  componentDidMount(){
    console.log('componentDidMount')
      fetch('/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log('response', response);
        // return response.json();
      });
  }

  render(){
    return (
      <div className="App">
      </div>
    )
  }
}

export default App;
