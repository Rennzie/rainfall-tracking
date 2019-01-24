import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

// COMPONENTS
import withStyles from '@material-ui/core/styles/withStyles';
import Rainfall from './Rainfall';
import RainfallNew from './Rainfall/New';
import Dashboard from './Dashboard/index';

const styles = theme => ({
  bodyContainer: {
    height: '100%',
    overflow: 'auto',
    paddingBottom: '114px',
    marginTop: theme.spacing.unit * 8
  }
});

function Pages({ classes }) {
  return (
    <main className={classes.bodyContainer}>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/rainfall" component={Rainfall} />
        <Route exact path="/rainfall/new" component={RainfallNew} />
      </Switch>
    </main>
  );
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Pages);
