import React, { Fragment, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { Query } from 'react-apollo';
import Fab from '@material-ui/core/Fab';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import orderBy from 'lodash/orderBy';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import RainfallLineChart from './LineChart';
import RainfallCards from './Card';
import GuageContext from '../contexts/GuageContext';

import {
  GET_DAILY_RAINFALL,
  GET_MONTHLY_RAINFALL,
  GET_TMRR_RAINFALL,
  GET_MORE_DAILY_RAINFALL,
  GET_MONTHS_RAINFALL_RECORDS
} from './queries';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  logButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: '56px',
    zIndex: 100,
    width: '100%'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

/**
 * How can we limit the number of results coming from the DB?
 * updating the cache when a new entry is created
 * NEED to look at the cache updating on rainfall updates
 */

function Rainfall({ classes }) {
  const [radioValue, setRadioValue] = useState('dailyRainfall');
  const [query, setQuery] = useState(GET_DAILY_RAINFALL);
  const handleChange = e => {
    setRadioValue(e.target.value);
    switch (e.target.value) {
      case 'twelveMonthRunningRainfall':
        return setQuery(GET_TMRR_RAINFALL);
      case 'monthlyRainfall':
        return setQuery(GET_MONTHLY_RAINFALL);
      case 'dailyRainfall':
        return setQuery(GET_DAILY_RAINFALL);
      default:
        return setQuery(GET_MONTHLY_RAINFALL);
    }
  };

  const GuageCtx = useContext(GuageContext);
  console.log('======> ', GuageCtx);

  return (
    <Fragment>
      {/* <Query query={query} variables={{ guageId: GuageCtx.id, limit: 10 }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error {console.error('ERROR====>', error)}</p>;
          // console.log('Returned from DB ======> ', data.rainfall[radioValue]);
          // const orderedRainfall = data.rainfall[radioValue];
          const orderedRainfall = orderBy(data.rainfall[radioValue], rainfall => rainfall.date, [
            'asc'
          ]);
          // console.log('Lodash ordered, ======> ', orderedRainfall);

          return <RainfallLineChart rainfall={orderedRainfall} />;
        }}
      </Query>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Time Period</FormLabel>
        <RadioGroup
          name="gender1"
          className={classes.group}
          value={radioValue}
          onChange={handleChange}
        >
          <FormControlLabel value="twelveMonthRunningRainfall" control={<Radio />} label="TMRR" />
          <FormControlLabel value="monthlyRainfall" control={<Radio />} label="Monthly" />
          <FormControlLabel value="dailyRainfall" control={<Radio />} label="Daily" />
        </RadioGroup>
      </FormControl> */}
      {/* NEXT: remove a months records from the store */}
      <Query
        query={GET_MONTHS_RAINFALL_RECORDS}
        variables={{
          guageId: '491c4b10-eacb-4590-a162-00d25daf889c',
          year: moment().year(),
          month: moment().month()
        }}
      >
        {({ data: { monthRainfall }, error, fetchMore, loading }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error {console.error('ERROR====>', error)}</p>;

          console.log('Returned from DB ======> ', monthRainfall);
          const lastRecord = monthRainfall[monthRainfall.length - 1];
          // console.log('Returned from DB ======> ', lastRecord);
          const currentMonth = moment(parseInt(lastRecord.date, 10)).month();
          const currentYear = moment(parseInt(lastRecord.date, 10)).year();
          let newMonth;
          let newYear;
          if (currentMonth === 0) {
            newYear = currentYear - 1;
            newMonth = 11;
          } else {
            newYear = currentYear;
            newMonth = currentMonth - 1;
          }

          const orderedRainfall = orderBy(monthRainfall, rainfall => rainfall.date, ['asc']);

          return (
            <Fragment>
              <RainfallLineChart rainfall={orderedRainfall} />
              <RainfallCards
                rainfallEntries={monthRainfall || []}
                onLoadMore={() =>
                  fetchMore({
                    query: GET_MONTHS_RAINFALL_RECORDS,
                    variables: {
                      year: newYear,
                      month: newMonth,
                      guageId: '491c4b10-eacb-4590-a162-00d25daf889c'
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      const previousRainfall = previousResult.monthRainfall;
                      console.log('PREVIOUS RAINFALL', previousRainfall);

                      const newRainfall = fetchMoreResult.monthRainfall;
                      console.log('NEW RAINFALL', newRainfall);

                      return {
                        year: newYear,
                        month: newMonth,
                        monthRainfall: [...previousRainfall, ...newRainfall],
                        __typename: previousRainfall.__typename
                      };
                    }
                  })
                }
              />
            </Fragment>
          );
        }}
      </Query>
      <div className={classes.logButtonContainer}>
        <Fab
          aria-label="Add"
          color="primary"
          className={classes.fab}
          component={Link}
          to="/rainfall/new"
        >
          <AddIcon />
        </Fab>
      </div>
    </Fragment>
  );
}

Rainfall.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Rainfall);
