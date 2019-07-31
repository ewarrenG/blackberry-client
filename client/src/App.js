import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Dropdown from './components/Dropdown';
import Searchbar from './components/Searchbar';
import Chart from './components/Chart';
import moment from 'moment';
import { cpus } from 'os';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companiesArr: [],
      companyNameDropdownValue: '',
      industryDropdownValue: '',
      selectedOption: [],
      chartData: {}
    };
  }

  async componentDidMount() {
    let response = await fetch('/companies', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    let responseData = await response.json();
    responseData.companies.sort(this.compareValues('company_name'));
    // responseData.companies.sort(this.compareValues('industry'));

    this.setState(
      {
        companiesArr: responseData.companies,
        companyNameDropdownValue: responseData.companies[0].company_name,
        industryDropdownValue: responseData.companies[0].industry,
        selectedOption: [responseData.companies[0]]
      },
      () => {
        this.getChartData();
      }
    );
  }

  //not sure this is necessary
  // componentWillMount() {
  //   // this.getChartData();
  // }

  handleDropdownChange = event => {
    // console.log('handleDropdownChange');
    // console.log(event.target);
    let targetVal = event.target.value;
    let key = event.target.dataset.key.replace(/_([a-z])/g, function(g) {
      return g[1].toUpperCase();
    });
    let stateToChange = key + 'DropdownValue';
    let companyArrForChart = [];
    this.setState(
      {
        [stateToChange]: event.target.value,
        selectedOption: []
      },
      () => {
        this.state.companiesArr.map(company => {
          if (key === 'industry') {
            if (company[key] === this.state[stateToChange]) {
              companyArrForChart.push(company);
            }
          } else {
            if (company['company_name'] === targetVal) {
              companyArrForChart.push(company);
            }
          }
        });
        this.setState(
          {
            selectedOption: companyArrForChart
          },
          () => {
            this.getChartData();
          }
        );
      }
    );
  };

  getChartData() {
    // console.log('getChartData');
    // console.log('this.state.selectedOption', this.state.selectedOption);
    let labelArr = [];
    let dataArr = [];
    for (let i = 0; i < this.state.selectedOption.length; i++) {
      let thisCompaniesData = {};
      let thisCompaniesPostingsArray = [];
      if (this.state.selectedOption[i].postings) {
        this.state.selectedOption[i].postings.map(day => {
          if (i === 0) {
            labelArr.push(moment(day.date).format('MM-DD-YY'));
          }
          thisCompaniesPostingsArray.push(day.number_of_jobs);
        });
        thisCompaniesData.data = thisCompaniesPostingsArray;
        thisCompaniesData.label = this.state.selectedOption[i].company_name;
        dataArr.push(thisCompaniesData);
      }
    }

    this.setState(
      prevState => ({
        chartData: {
          ...prevState.chartData,
          labels: labelArr,
          datasets: dataArr
        }
      }),
      () => {
        // console.log("getChartData callback")
      }
    );
  }

  compareValues(key, order = 'asc') {
    return function(a, b) {
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
          <div className="row pt-5">
            <div className="col-sm-2" />
            <Dropdown
              options={this.state.companiesArr}
              for="company_name"
              handleDropdownChange={this.handleDropdownChange}
              value={this.state.companyNameDropdownValue}
              title="Filter by Company Name"
            />
            <Dropdown
              options={this.state.companiesArr}
              for="industry"
              handleDropdownChange={this.handleDropdownChange}
              value={this.state.industryDropdownValue}
              title="Filter by Industry"
            />
          </div>
          <Chart
            legendPosition="bottom"
            chartData={this.state.chartData}
            location="Massachusetts"
            companyName={this.state.selectedOption.company_name}
          />
        </div>
      </div>
    );
  }
}

export default App;
