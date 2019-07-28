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
      resultsArr: [],
      masterArr: [],
      companyNameDropdownValue: '',
      industryDropdownValue: '',
      selectedOption: [],//{},
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
    console.log('responseData', responseData);
    responseData.results.sort(this.compareValues('companyName'));

    this.setState(
      {
        resultsArr: responseData.results,
        masterArr: responseData.master,
        companyNameDropdownValue: responseData.results[0].companyName,
        industryDropdownValue: responseData.master[0].industry,
        selectedOption: [responseData.results[0]]
      },
      () => {
        console.log('this.state.selectedOption', this.state.selectedOption)
        this.getChartData();
      }
    );
  }

  componentWillMount() {
    this.getChartData();
  }

  //settings
  handleDropdownChange = event => {
    console.log('handleDropdownChange')
    // console.log(event.target);
    let targetVal = event.target.value;
    let key = event.target.dataset.key.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); })
    let stateToChange = key + 'DropdownValue';
    let companyArrMatchingIndustry = [];
    // console.log('stateToChange', stateToChange)
    this.setState({
      [stateToChange]: event.target.value,
      selectedOption: []
    },
      () => {
        if (key === 'industry') {
          this.state.masterArr.map(masterItem => {
            if (masterItem[key] === this.state[stateToChange]) {
              companyArrMatchingIndustry.push(masterItem.company_name)
            }
          })
        } else {
          this.state.masterArr.map(masterItem => {
            if (masterItem['company_name'] === targetVal) {
              companyArrMatchingIndustry.push(masterItem.company_name)
            }
          })
        }
        console.log('companyArrMatchingIndustry', companyArrMatchingIndustry)

        this.state.resultsArr.map(result => {
          if (companyArrMatchingIndustry.indexOf(result.companyName) > -1) {
            this.setState(prevState => ({
              selectedOption: [...prevState.selectedOption, result]
            }), () => {
              console.log('inside callback????')
              this.getChartData()
            })
          }
        })
      });
  };

  handleMatchingSearch(searchTerm, matchingResult) {
    //console.log('handleMatchingSearch')
    // console.log('searchTerm', searchTerm)
    //console.log('matchingResult', matchingResult)

    this.setState(
      {
        selectedOption: matchingResult
      },
      () => {
        this.getChartData();
      }
    );
  }

  getChartData() {
    console.log('getChartData')
    console.log('this.state.selectedOption', this.state.selectedOption)
    let labelArr = [];
    let dataArr = [];
    for (let i = 0; i < this.state.selectedOption.length; i++) {
      let thisCompaniesData = {};
      let thisCompaniesPostingsArray = []
      this.state.selectedOption[i].jobPostings.map(day => {
        if (i === 0) {
          labelArr.push(moment(day.date).format('MM-DD-YY'));
        }
        thisCompaniesPostingsArray.push(day.numberOfJobs);
      });
      thisCompaniesData.data = thisCompaniesPostingsArray;
      thisCompaniesData.label = this.state.selectedOption[i].companyName;
      dataArr.push(thisCompaniesData);
    }

    console.log('labelArr', labelArr)
    console.log('dataArr', dataArr)

    this.setState(
      prevState => ({
        chartData: {
          ...prevState.chartData,
          labels: labelArr,
          datasets: dataArr, //[{ ...prevState.chartData.dataSets, data: dataArr }]
        }
      }),
      () => {
        console.log('this.state.chartData', this.state.chartData)
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

          <div className="row pt-5">
            <Dropdown
              options={this.state.masterArr}
              for="company_name"
              handleDropdownChange={this.handleDropdownChange}
              value={this.state.companyNameDropdownValue}
              title="Filter by Company Name"
            />
            <Dropdown
              options={this.state.masterArr}
              for="industry"
              handleDropdownChange={this.handleDropdownChange}
              value={this.state.industryDropdownValue}
              title="Filter by Industry"
            />
          </div>
          {/* <Searchbar inputValue='' results={this.state.results} handleMatchingSearch={this.handleMatchingSearch} /> */}
          <Chart
            legendPosition="bottom"
            chartData={this.state.chartData}
            location="Massachusetts"
            companyName={this.state.selectedOption.companyName}
          />
        </div>
      </div>
    );
  }
}

export default App;
