import React, { Fragment } from 'react';
import { Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';
import moment from 'moment';

export default function RainfallCards({ rainfallEntries, onLoadMore }) {
  return (
    <Fragment>
      {rainfallEntries.map(rain => (
        <Paper key={rain.id}>
          date: {moment(parseInt(rain.date, 10)).format('DD MMM YYYY')}
          rain: {rain.rainfall} mm
        </Paper>
      ))}
      <Button onClick={onLoadMore}>Load More</Button>
    </Fragment>
  );
}
