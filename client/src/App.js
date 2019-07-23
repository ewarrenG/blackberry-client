import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from './components/Dropdown';
// import Graph from './components/Graph';
import Chart from './components/Chart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      dropdownValue: '',
      result: {},
      chartData: {}
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

  componentWillMount() {
    this.getChartData()
  }

  getChartData() {
    this.setState({
      chartData: {
        labels: ['Boston1', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets: [{
          label: 'Population',
          data: [
            617594,
            181045,
            153060,
            106519,
            105162,
            95072
          ],
          //backgroundColor:'green',
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ]
        }]
      }
    })
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
        {/* <Graph result={this.state.result} /> */}
        <Chart legendPosition="bottom" chartData={this.state.chartData} location="Massachusetts" />
        {/* <Chart legendPosition="top" chartData={this.state.chartData} location="New York" /> */}
      </div>
    );
  }
}

export default App;
