import React from 'react';

class Graph extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // console.log('this.props.result', this.props.result.jobPostings);
    // this.props.result.jobPostings
    //   ? this.props.result.jobPostings.map(day => console.log('day'))
    //   : '';
  }

  render() {
    console.log('this.props.result.jobPostings', this.props.result.jobPostings);
    return (
      <div>
        <h2>Job Posting Data for {this.props.result.companyName}</h2>
        {this.props.result.jobPostings
          ? this.props.result.jobPostings.map(res => <span>{res.numberOfJobs}</span>)
          : ''}
      </div>
    );
  }
}

export default Graph;
