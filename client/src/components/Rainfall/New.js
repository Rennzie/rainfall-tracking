import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import withStyles from '@material-ui/core/styles/withStyles';
import uuidv4 from 'uuid/v4';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';

const NEW_RAINFALL = gql`
  mutation createRainfallMutation($id: ID!, $guageId: ID!, $rainfall: Int!, $date: String!) {
    newRainfall: createRainfall(
      id: $id
      guage_id: $guageId
      rainfall: $rainfall
      date: $date
      unit: "mm"
    ) {
      id
      guage_id
      rainfall
      date
      unit
    }
  }
`;

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
    setValues({ [name]: e.target.value });
  };

  const handleSubmit = () => {
    setValues({
      date: moment().format('YYYY-MM-DD'),
      rainfall: 0
    });
    history.push('/rainfall');
  };

  return (
    <Fragment>
      <Mutation
        mutation={NEW_RAINFALL}
        // update={(cache, { data: { rainfall } }) => {
        //   const { farm } = cache.readQuery({
        //     query: GET_FARM_RAINFALL,
        //     variables: { farmId: 1 }
        //   });
        //   farm.rainfall.push(rainfall);
        //   cache.writeQuery({
        //     query: GET_FARM_RAINFALL,
        //     data: { farm }
        //   });
        // }}
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
                handleNewRainfall({
                  variables: {
                    date: moment(values.date).format('YYYY-MM-DD'),
                    guageId: '491c4b10-eacb-4590-a162-00d25daf889c',
                    id: uuidv4(),
                    rainfall: parseInt(values.rainfall, 10)
                  }
                });
                handleSubmit();
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
