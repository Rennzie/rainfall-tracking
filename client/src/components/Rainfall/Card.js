import React, { Fragment } from 'react';
import { Paper, withStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import moment from 'moment';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit
  }
});

function RainfallCards({ classes, rainfallEntries, onLoadMore }) {
  return (
    <Fragment>
      {rainfallEntries.map(rain => (
        <Paper key={rain.id} className={classes.margin}>
          date: {moment(rain.date).format('DD MMM YYYY')}
          rain: {rain.rainfall} mm
        </Paper>
      ))}
      <Button onClick={onLoadMore}>Load More</Button>
    </Fragment>
  );
}

export default withStyles(styles)(RainfallCards);
