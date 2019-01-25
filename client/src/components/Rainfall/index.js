import React, { Fragment, useState } from 'react';
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
// import DeleteComponent from '../common/DeleteMutation';
import RainfallLineChart from './LineChart';

import { GET_DAILY_RAINFALL, GET_MONTHLY_RAINFALL, GET_TMRR_RAINFALL } from './queries';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: '40px',
    left: '43%',

    zIndex: 100,

    margin: theme.spacing.unit
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
  const [radioValue, setRadioValue] = useState('monthlyRainfall');
  const [query, setQuery] = useState(GET_MONTHLY_RAINFALL);
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

  return (
    <Fragment>
      <Query query={query} variables={{ guageId: '491c4b10-eacb-4590-a162-00d25daf889c' }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error {console.error('ERROR====>', error)}</p>;
          console.log('======> ', data);
          const orderedRainfall = orderBy(data.rainfall[radioValue], rainfall => rainfall.date, [
            'asc'
          ]);

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
      </FormControl>
      <Fab
        aria-label="Add"
        color="primary"
        className={classes.fab}
        component={Link}
        to="/rainfall/new"
      >
        <AddIcon />
      </Fab>
    </Fragment>
  );
}

Rainfall.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Rainfall);

// {
//   editRainfall && (
//     <Fragment>
//       <Typography>Edit Rainfall {editingId}</Typography>
//       {/** THIS MIGRATION DOES NOT UPDATE THE UI REACTIVELY!! */}
//       <Mutation mutation={EDIT_RAINFALL}>
//         {(handleEditRainfall, { loading, error }) => (
//           <Fragment>
//             <NewEditForm
//               editingId={editingId}
//               handleMutation={handleEditRainfall}
//               handleChange={handleChange}
//               values={values}
//               setValues={setValues}
//             />

//             {loading && <p>Loading...</p>}
//             {error && <p>Error :/ Please try again</p>}
//           </Fragment>
//         )}
//       </Mutation>
//     </Fragment>
//   );
// }

// return orderBy(data.RainGuage.monthlyRainfall, rainfall => rainfall.date, ['desc']).map(
//   ({ id, rainfall, date }) => (
//     <Paper key={id}>
//       <p>
//         Amount:
//         {rainfall} mm
//       </p>
//       <p>
//         Date:
//         {date}
//       </p>
//       {/* <Icon
//                   onClick={() => {
//                     setEditingId(id);
//                     setEditRainfall(true);
//                     setValues({
//                       date,
//                       rainfall
//                     });
//                   }}
//                   fontSize="small"
//                 >
//                   edit
//                 </Icon> */}
//       {/* <DeleteComponent id={id} query={DELETE_RAINFALL} /> */}
//     </Paper>
//   )
// );
