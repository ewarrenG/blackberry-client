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
              text: this.props.companyName,
              fontSize: 25
            },
            scales: {
              yAxes: [
                {
                  id: 'postings',
                  type: 'linear',
                  position: 'left'
                },
                {
                  id: 'stock',
                  type: 'linear',
                  position: 'right'
                }
              ]
            },
            maintainAspectRatio: false,
            responsive: true
          }}
        />
      </div>
    );
  }
}

export default Chart;
