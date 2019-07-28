import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Dropdown from './components/Dropdown';
import Searchbar from './components/Searchbar';
import Chart from './components/Chart';
import moment from 'moment';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      dropdownValue: '',
      result: {},
      chartData: {},
      // inputValue: ''
    };

    this.handleMatchingSearch = this.handleMatchingSearch.bind(this);

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

    responseData.results.sort(this.compareValues('companyName'));

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

  handleMatchingSearch(searchTerm, matchingResult) {
    console.log('handleMatchingSearch')
    // console.log('searchTerm', searchTerm)
    console.log('matchingResult', matchingResult)

    this.setState(
      {
        result: matchingResult
      },
      () => {
        this.getChartData();
      }
    );
  }

  getChartData() {
    console.log('getChartData')
    // let labelArr = this.state.result.jobPostings.map(item => item.date);
    // console.log('labelArr', labelArr);
    let labelArr = [];
    let dataArr = [];
    if (this.state.result.jobPostings) {
      this.state.result.jobPostings.map(day => {
        labelArr.push(moment(day.date).format('MM-DD-YY'));
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
        // console.log('callback after setting state');
        // console.log('this.state.chartData', this.state.chartData);
      }
    );
  }

  compareValues(key, order = 'asc') {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  }

  render() {
    return (
      <div className="App">
        <Navbar />

        <div className="home container p-5">
          {/* <Dropdown
            results={this.state.results}
            handleDropdownChange={this.handleDropdownChange}
            dropdownValue={this.state.dropdownValue}
          /> */}
          <Searchbar inputValue='' results={this.state.results} handleMatchingSearch={this.handleMatchingSearch} />
          <Chart
            legendPosition="bottom"
            chartData={this.state.chartData}
            location="Massachusetts"
            companyName={this.state.result.companyName}
          />
        </div>
      </div>
    );
  }
}

export default App;
