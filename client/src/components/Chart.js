import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    location: 'City'
  };

  render() {
    return (
      <div className="chart">
        <Line
          data={this.props.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: 'Job Openings Over Time',
              fontSize: 25
            }
            /*legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }*/
          }}
        />
      </div>
    );
  }
}

export default Chart;
