import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from './components/Dropdown';
import Graph from './components/Graph';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      dropdownValue: '',
      result: {}
    };
  }

  async componentDidMount() {
    let response = await fetch('/results', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    // console.log('response', response);
    let responseData = await response.json();
    // console.log('responseData', responseData);
    this.setState({
      results: responseData.results,
      dropdownValue: responseData.results[0].companyName,
      result: responseData.results[0]
    });
  }

  //settings
  handleDropdownChange = event => {
    this.setState({
      dropdownValue: event.target.value
    });
    this.state.results.map(result => {
      if (result.companyName === event.target.value) {
        this.setState({
          result: result
        });
      }
    });
  };

  render() {
    console.log('this.state.results', this.state.results);
    console.log('this.state.result', this.state.result);
    console.log('this.state.result.jobPostings', this.state.result.jobPostings);
    return (
      <div className="App">
        <Dropdown
          results={this.state.results}
          handleDropdownChange={this.handleDropdownChange}
          dropdownValue={this.state.dropdownValue}
        />
        <Graph result={this.state.result} />
      </div>
    );
  }
}

export default App;
