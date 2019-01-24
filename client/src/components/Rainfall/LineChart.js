import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';
import moment from 'moment';

function RainfallLineChart({ rainfall }) {
  const chartOptions = {
    maintainAspectRatio: false
  };
  const data = [];
  const labels = [];

  rainfall.forEach(rainfallObj => {
    labels.push(moment(rainfallObj.date).format('MMM YY'));
    data.push(rainfallObj.rainfall);
  });
  console.log(data);
  console.log(labels);
  const chartData = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    labels,
    datasets: [
      {
        label: 'My First dataset',
        // backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data
      }
    ]
  };

  return <Line data={chartData} options={chartOptions} height={50} width={100} />;
}

RainfallLineChart.propTypes = {
  rainfall: PropTypes.array.isRequired
};

export default RainfallLineChart;
