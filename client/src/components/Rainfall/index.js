import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Fab from '@material-ui/core/Fab';
import withStyles from '@material-ui/core/styles/withStyles';
// import Typography from '@material-ui/core/Typography';
import orderBy from 'lodash/orderBy';
import AddIcon from '@material-ui/icons/Add';
// import DeleteComponent from '../common/DeleteMutation';
import RainfallLineChart from './LineChart';

const GET_GUAGE_RAINFALL = gql`
  query RainGuageQuery($guageId: ID!) {
    RainGuage(id: $guageId) {
      farm_id
      dailyRainfall {
        id
        guage_id
        rainfall
        unit
        date
      }
    }
  }
`;

// const DELETE_RAINFALL = gql`
//   mutation EditRainfall($id: ID!) {
//     rainfall: deleteRainfall(id: $id) {
//       message
//     }
//   }
// `;

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

function Rainfall({ classes }) {
  return (
    <Fragment>
      <Query
        query={GET_GUAGE_RAINFALL}
        variables={{ guageId: '491c4b10-eacb-4590-a162-00d25daf889c' }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error {console.log('ERROR====>', error)}</p>;
          console.log('======> ', data);
          // setMonthlyRainfall({ monthlyRainfall: data.RainGuage.monthlyRainfall });
          const orderedRainfall = orderBy(data.RainGuage.dailyRainfall, rainfall => rainfall.date, [
            'asc'
          ]);

          return <RainfallLineChart rainfall={orderedRainfall} />;
        }}
      </Query>
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
