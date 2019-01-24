import React, { lazy, Suspense, Fragment } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import BottomNav from './BottomNav';

const styles = () => ({
  appBackground: {
    backgroundColor: '#fbc02d',
    position: 'fixed',
    top: '0',
    height: '100vh',
    width: '100vw'
  }
});

const Pages = lazy(() => import('./Pages'));

function App({ classes }) {
  return (
    <Fragment>
      <CssBaseline />;
      <main className={classes.appBackground}>
        <Suspense fallback={<p>Please wait, loading</p>}>
          <Pages />
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
