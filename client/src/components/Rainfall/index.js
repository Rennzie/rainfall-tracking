import React, { Fragment, useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import NewEditForm from './NewEditForm';

const GET_FARM_RAINFALL = gql`
  query FarmRainfallQuery($farmId: Int!) {
    farm: Farm(id: $farmId) {
      farm_owner
      rainfall {
        id
        rain
        date
        farm_id
      }
    }
  }
`;

const ADD_RAINFALL = gql`
  mutation AddRainfall($rainfall: Int!, $date: String!) {
    rainfall: createRainfall(farm_id: 1, rain: $rainfall, unit: "mm", date: $date) {
      farm_id
      rain
      date
      unit
      id
    }
  }
`;
const EDIT_RAINFALL = gql`
  mutation EditRainfall($id: Int!, $date: String, $rainfall: Int) {
    rainfall: updateRainfall(farm_id: 1, id: $id, rain: $rainfall, date: $date) {
      message
    }
  }
`;

export default function Rainfall() {
  const [values, setValues] = useState({
    rainfall: 0,
    date: moment().format('YYYY-MM-DD')
  });

  const [editRainfall, setEditRainfall] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <Fragment>
      {!editRainfall && (
        <Fragment>
          <Typography>New Rainfall</Typography>
          <Mutation
            mutation={ADD_RAINFALL}
            update={(cache, { data: { rainfall } }) => {
              const { farm } = cache.readQuery({
                query: GET_FARM_RAINFALL,
                variables: { farmId: 1 }
              });
              farm.rainfall.push(rainfall);
              cache.writeQuery({
                query: GET_FARM_RAINFALL,
                data: { farm }
              });
            }}
          >
            {(handleNewRainfall, { loading, error }) => (
              <Fragment>
                <NewEditForm
                  handleMutation={handleNewRainfall}
                  handleChange={handleChange}
                  values={values}
                  setValues={setValues}
                />

                {loading && <p>Loading...</p>}
                {error && <p>Error :/ Please try again</p>}
              </Fragment>
            )}
          </Mutation>
        </Fragment>
      )}
      {editRainfall && (
        <Fragment>
          <Typography>Edit Rainfall {editingId}</Typography>
          {/** THIS MIGRATION DOES NOT UPDATE THE UI REACTIVELY!! */}
          <Mutation mutation={EDIT_RAINFALL}>
            {(handleEditRainfall, { loading, error }) => (
              <Fragment>
                <NewEditForm
                  editingId={editingId}
                  handleMutation={handleEditRainfall}
                  handleChange={handleChange}
                  values={values}
                  setValues={setValues}
                />

                {loading && <p>Loading...</p>}
                {error && <p>Error :/ Please try again</p>}
              </Fragment>
            )}
          </Mutation>
        </Fragment>
      )}
      <Query query={GET_FARM_RAINFALL} variables={{ farmId: 1 }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <p>Error {console.log('ERROR====>', error)}</p>;

          return orderBy(data.farm.rainfall, rainfall => rainfall.date, ['desc']).map(
            ({ id, rain, date }) => (
              <Paper key={id}>
                <p>
                  Amount:
                  {rain} mm
                </p>
                <p>
                  Date:
                  {date}
                </p>
                <Icon
                  onClick={() => {
                    setEditingId(id);
                    setEditRainfall(true);
                    setValues({
                      date,
                      rainfall: rain
                    });
                  }}
                  fontSize="small"
                >
                  edit
                </Icon>
              </Paper>
            )
          );
        }}
      </Query>
    </Fragment>
  );
}

// <ApolloConsumer>
//   {client => (
//     <button
//       onClick={async () => {
//         const { data } = await client.query({
//           query: GET_FARM,
//           variables: { farmId: 1 }
//         });
//         await setFarmOwner(data.farm.farm_owner, () => console.log('=======> ', farmOwner));
//         console.log('========>', farmOwner);
//       }}
//     >
//       Get Farm Owner
//     </button>
//   )}
// </ApolloConsumer>
