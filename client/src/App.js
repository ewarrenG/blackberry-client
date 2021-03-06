import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Dropdown from './components/Dropdown';
// import Searchbar from './components/Searchbar';
import Chart from './components/Chart';
import moment from 'moment';

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

    //begin stock info request
    let selectedOptionWithStock = await retrieveStockInfoForCompany(selectedOption);

    this.setState(
      {
        companiesArr: responseData.companies,
        companyNameDropdownValue: companyNameDropdownValue,
        industryDropdownValue: responseData.companies[0].industry,
        selectedOption: selectedOptionWithStock
      },
      async () => {
        this.getChartData();
      }
    );
  }

  handleDropdownChange = event => {
    // console.log('handleDropdownChange');
    // console.log(event.target);
    let targetVal = event.target.value;
    let key = event.target.dataset.key.replace(/_([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
    let stateToChange = key + 'DropdownValue';
    let selectedOption = [];
    this.setState(
      {
        [stateToChange]: event.target.value,
        selectedOption: []
      },
      async () => {
        this.state.companiesArr.map(company => {
          if (key === 'industry') {
            if (company[key] === this.state[stateToChange]) {
              selectedOption.push(company);
            }
          } else {
            if (company['company_name'] === targetVal) {
              selectedOption.push(company);
            }
          }
        });

        //begin stock info request
        let selectedOptionWithStock = await retrieveStockInfoForCompany(selectedOption);

        this.setState(
          {
            selectedOption: selectedOptionWithStock
          },
          () => {
            this.getChartData();
          }
        );
      }
    );
  };

  getChartData() {
    let labelArr = [];
    let dataArr = [];
    for (let i = 0; i < this.state.selectedOption.length; i++) {
      // let thisCompaniesData = {};
      let thisCompaniesPostingsData = {};
      let thisCompaniesStockData = {};
      let thisCompaniesPostingsArray = [];
      let thisCompaniesStockArray = [];
      let mostRecentValidStockPrice;
      if (this.state.selectedOption[i].postings) {
        this.state.selectedOption[i].postings.map(day => {
          if (i === 0) {
            labelArr.push(moment(day.date).format('MM-DD-YY'));
          }
          thisCompaniesPostingsArray.push(day.number_of_jobs);

          if (day.stock_info) {
            mostRecentValidStockPrice = day.stock_info.open;
          }

          thisCompaniesStockArray.push(mostRecentValidStockPrice);
        });
        thisCompaniesPostingsData.data = thisCompaniesPostingsArray;
        thisCompaniesPostingsData.label = 'Job Openings';
        thisCompaniesPostingsData.backgroundColor = getRandomColor();
        thisCompaniesPostingsData.fill = false;
        thisCompaniesPostingsData.yAxisID = 'postings';
        dataArr.push(thisCompaniesPostingsData);

        thisCompaniesStockData.data = thisCompaniesStockArray;
        thisCompaniesStockData.label = 'Stock Price';
        thisCompaniesStockData.backgroundColor = getRandomColor();
        thisCompaniesStockData.fill = false;
        thisCompaniesStockData.yAxisID = 'stock';
        dataArr.push(thisCompaniesStockData);
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
    let companyName;
    this.state.selectedOption[0]
      ? (companyName = this.state.selectedOption[0].company_name)
      : (companyName = 'Awaiting...');
    return (
      <div className="App">
        <Navbar />
        <div className="home container p-5">
          <div className="row pt-5">
            <div className="col-sm-4" />
            <Dropdown
              options={this.state.companiesArr}
              for="company_name"
              handleDropdownChange={this.handleDropdownChange}
              value={this.state.companyNameDropdownValue}
              title="Filter by Company Name"
            />
            {/* comment out industry for now */}
            {/* <Dropdown
              options={this.state.companiesArr}
              for="industry"
              handleDropdownChange={this.handleDropdownChange}
              value={this.state.industryDropdownValue}
              title="Filter by Industry"
            /> */}
          </div>
          {/* <div className="row pt-5"> */}
          <Chart
            legendPosition="bottom"
            chartData={this.state.chartData}
            location="Massachusetts"
            companyName={companyName}
          />
          {/* </div> */}
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
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

async function retrieveStockInfoForCompany(selectedOption) {
  let urlToUseForStock = '/stock/' + selectedOption[0].ticker;
  let dates = selectedOption[0].postings;
  let datesObj = { postings: dates };
  let stockResponse = await fetch(urlToUseForStock, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datesObj)
  });

  let responseStockData = await stockResponse.json();
  selectedOption[0].postings.forEach(day => {
    let formattedDate = moment(day.date).format('YYYY-MM-DD');
    if (responseStockData[formattedDate]) {
      day.stock_info = responseStockData[formattedDate];
    }
  });
  return selectedOption;
}

export default App;
