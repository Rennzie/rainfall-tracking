import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import withStyles from '@material-ui/core/styles/withStyles';
import uuidv4 from 'uuid/v4';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import {
  NEW_RAINFALL,
  GET_DAILY_RAINFALL,
  GET_MONTHLY_RAINFALL,
  GET_TMRR_RAINFALL,
  GET_MONTHS_RAINFALL_RECORDS
} from './queries';

const styles = theme => ({
  margin: { margin: theme.spacing.unit },
  column: { display: 'flex', flexDirection: 'column', margin: theme.spacing.unit * 4 }
});

function RainfallNew({ classes, history }) {
  const [values, setValues] = useState({
    date: moment().format('YYYY-MM-DD'),
    rainfall: 0
  });

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  /**
   * The queries with hard coded rainguage variable
   * to be refetched after adding a new rainfall record
   */
  const refetchQueries = [
    /**
     * THIS IS NOT THE BEST METHOD IN MY OPINION
     * WILL REFETCH ALL THE RAINFALL QUERIES AFTER EACH MUTATION WHICH ADDS NEW RAINFALL
     *
     * THIS IS A BIT COMPLEX, NEED TO REFETCH ALL QUERIES IN THE CACHE
     */
    {
      query: GET_TMRR_RAINFALL,
      variables: { guageId: '491c4b10-eacb-4590-a162-00d25daf889c' }
    },
    {
      query: GET_MONTHLY_RAINFALL,
      variables: { guageId: '491c4b10-eacb-4590-a162-00d25daf889c' }
    },
    {
      query: GET_DAILY_RAINFALL,
      variables: { guageId: '491c4b10-eacb-4590-a162-00d25daf889c' }
    },
    {
      query: GET_MONTHS_RAINFALL_RECORDS,
      variables: { guageId: '491c4b10-eacb-4590-a162-00d25daf889c' }
    }
  ];

  return (
    <Fragment>
      <Mutation
        awaitRefetchQueries
        mutation={NEW_RAINFALL}
        ignoreResults
        // refetchQueries={() => refetchQueries}
        onCompleted={() => history.push('/rainfall')}
      >
        {(handleNewRainfall, { loading, error }) => (
          <section className={classes.column}>
            <Typography align="center" variant="headline">
              New Rainfall
            </Typography>
            <TextField
              className={classes.margin}
              required
              id="rainfall"
              label="Rainfall"
              onChange={handleChange('rainfall')}
              value={values.rainfall}
            />
            <TextField
              className={classes.margin}
              id="date"
              label="Date"
              type="date"
              onChange={handleChange('date')}
              value={values.date}
            />

            <Button
              className={classes.margin}
              color="primary"
              onClick={() => {
                console.log('the rainfall value is', values.rainfall);
                handleNewRainfall({
                  variables: {
                    date: moment(values.date).format('YYYY-MM-DD'),
                    guageId: '491c4b10-eacb-4590-a162-00d25daf889c',
                    id: uuidv4(),
                    rainfall: parseInt(values.rainfall, 10)
                  }
                });
              }}
              variant="contained"
            >
              Add Rainfall
            </Button>

            {loading && <p>Loading...</p>}
            {error && <p>Error :/ Please try again</p>}
          </section>
        )}
      </Mutation>
    </Fragment>
  );
}

RainfallNew.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(RainfallNew);
