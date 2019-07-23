import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from './components/Dropdown';
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
    let responseData = await response.json();
    console.log('responseData', responseData); //how do I get this to chartData format?
    this.setState(
      {
        results: responseData.results,
        dropdownValue: responseData.results[0].companyName,
        result: responseData.results[0]
      },
      () => {
        this.getChartData();
      }
    );
  }

  componentWillMount() {
    this.getChartData();
  }

  //settings
  handleDropdownChange = event => {
    this.setState({
      dropdownValue: event.target.value
    });
    this.state.results.map(result => {
      if (result.companyName === event.target.value) {
        this.setState(
          {
            result: result
          },
          () => {
            this.getChartData();
          }
        );
      }
    });
  };

  getChartData() {
    // let labelArr = this.state.result.jobPostings.map(item => item.date);
    // console.log('labelArr', labelArr);
    let labelArr = [];
    let dataArr = [];
    if (this.state.result.jobPostings) {
      this.state.result.jobPostings.map(day => {
        labelArr.push(day.date);
        dataArr.push(day.numberOfJobs);
      });
    }

    this.setState(
      prevState => ({
        chartData: {
          ...prevState.chartData,
          labels: labelArr,
          datasets: [{ ...prevState.chartData.dataSets, label: 'Openings', data: dataArr }]
        }
      }),
      () => {
        console.log('callback after setting state');
        console.log('this.state.chartData', this.state.chartData);
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Dropdown
          results={this.state.results}
          handleDropdownChange={this.handleDropdownChange}
          dropdownValue={this.state.dropdownValue}
        />
        <Chart legendPosition="bottom" chartData={this.state.chartData} location="Massachusetts" />
      </div>
    );
  }
}

export default App;
