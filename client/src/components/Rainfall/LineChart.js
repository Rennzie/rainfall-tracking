import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Line, Bar } from 'react-chartjs-2';
import moment from 'moment';

function RainfallLineChart({ rainfall }) {
  const chartOptions = {
    scales: {
      xAxes: [{ type: 'time', time: { displayFormats: { quarter: 'MMM YYYY' } } }]
    }
    // maintainAspectRatio: false
  };
  const data = [];

  rainfall.forEach(rainfallObj => {
    data.push({ t: moment(parseInt(rainfallObj.date, 10)), y: rainfallObj.rainfall });
    // labels.push(moment(rainfallObj.date).format('MMM YY'));
    // data.push(rainfallObj.rainfall);
  });
  // console.log(data);
  const chartData = {
    // labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data
      }
      // {
      //   label: 'Bar',
      //   // backgroundColor: 'rgb(255, 99, 132)',
      //   borderColor: 'rgb(255, 99, 102)',
      //   data,
      //   type: 'line'
      // }
    ]
  };

  return (
    <Fragment>
      <Bar data={chartData} options={chartOptions} height={50} width={100} />
      {/* <Line data={chartData} options={chartOptions} height={50} width={100} /> */}
    </Fragment>
  );
}

RainfallLineChart.propTypes = {
  rainfall: PropTypes.array.isRequired
};

export default RainfallLineChart;
