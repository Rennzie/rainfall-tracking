import React, { lazy, Suspense, Fragment } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import BottomNav from './BottomNav';

import GuageContext from './contexts/GuageContext';

const Pages = lazy(() => import('./Pages'));

const styles = () => ({
  appBackground: {
    backgroundColor: '#fbc02d',
    position: 'fixed',
    top: '0',
    height: '100vh',
    width: '100vw'
  }
});

const GET_RAINGUAGE = gql`
  query GetRainGuage($guageId: ID!) {
    rainGuageDetails: RainGuage(id: $guageId) {
      id
      farm_id
    }
  }
`;

// BUG: RainGuage queries are not going through as they are missing the id

function App({ classes }) {
  return (
    <Fragment>
      <CssBaseline />;
      <main className={classes.appBackground}>
        <Suspense fallback={<p>Please wait, loading</p>}>
          <Query
            query={GET_RAINGUAGE}
            variables={{ guageId: '491c4b10-eacb-4590-a162-00d25daf889c' }}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading ...</p>;
              if (error) return <p>Error {console.error('ERROR====>', error)}</p>;
              console.log('DATA FROM APP.JS', data);
              return (
                <GuageContext.Provider value={data.rainGuageDetails}>
                  <Pages />
                </GuageContext.Provider>
              );
            }}
          </Query>
        </Suspense>
        <BottomNav />
      </main>
    </Fragment>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
