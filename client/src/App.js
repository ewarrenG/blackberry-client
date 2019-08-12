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
    let urlVars = getUrlVars();
    let urlToUse = '/companies';
    if (urlVars.company_name) urlToUse += '/' + urlVars.company_name;
    let response = await fetch(urlToUse, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    let responseData = await response.json();
    console.log(
      'responseData', responseData
    )
    responseData.companies.sort(this.compareValues('company_name'));
    let companyNameDropdownValue = responseData.companies[0].company_name;
    let selectedOption = [responseData.companies[0]];
    if (responseData.company_param) {
      responseData.companies.map(company => {
        if (company.company_name === responseData.company_param) {
          companyNameDropdownValue = company.company_name;
          selectedOption = [company];
        }
      });
    }
    this.setState(
      {
        companiesArr: responseData.companies,
        companyNameDropdownValue: companyNameDropdownValue,
        industryDropdownValue: responseData.companies[0].industry,
        selectedOption: selectedOption
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
        // console.log('companyArrForChart', companyArrForChart);
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
        thisCompaniesData.backgroundColor = getRandomColor();
        thisCompaniesData.fill = false;
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
        // console.log('getChartData callback');
        // console.log('this.state.chartData', this.state.chartData);
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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    vars[key] = value;
  });
  return vars;
}

export default App;
