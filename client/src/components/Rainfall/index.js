import React, { Fragment, useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import orderBy from 'lodash/orderBy';

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

export default function Rainfall() {
  const [values, setValues] = useState({
    rainfall: 0,
    date: moment().format('YYYY-MM-DD')
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <Fragment>
      <Mutation
        mutation={ADD_RAINFALL}
        update={(cache, { data: { rainfall } }) => {
          const { farm } = cache.readQuery({ query: GET_FARM_RAINFALL, variables: { farmId: 1 } });
          farm.rainfall.push(rainfall);
          cache.writeQuery({
            query: GET_FARM_RAINFALL,
            data: { farm }
          });
        }}
      >
        {(handleNewRainfall, { loading, error }) => (
          <Fragment>
            <TextField
              id="date"
              label="Date"
              type="date"
              onChange={handleChange('date')}
              value={values.date}
            />
            <TextField
              id="rainfall"
              label="Rainfall"
              onChange={handleChange('rainfall')}
              value={values.rainfall}
            />

            <Button
              onClick={() => {
                handleNewRainfall({
                  variables: {
                    rainfall: parseInt(values.rainfall, 10),
                    date: moment(values.date).format('YYYY-MM-DD')
                  }
                });
              }}
            >
              Add Rainfall
            </Button>
            {loading && <p>Loading...</p>}
            {error && <p>Error :/ Please try again</p>}
          </Fragment>
        )}
      </Mutation>

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
