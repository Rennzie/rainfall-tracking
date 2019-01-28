import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  fabContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'fixed',
    bottom: '56px',
    zIndex: 100,
    width: '100%'
  },
  fab: {
    margin: theme.spacing.unit
  },
  logButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  quickLinksContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quickLink: {
    margin: theme.spacing.unit
  },
  quickLeft: {
    alignSelf: 'flex-end'
  },
  quickMiddleLeft: {
    marginBottom: theme.spacing.unit * 4
  },
  quickMiddle: {
    marginBottom: theme.spacing.unit * 8
  },
  quickMiddleRight: {
    marginBottom: theme.spacing.unit * 4
  },
  quickRight: {
    alignSelf: 'flex-end'
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

function Dashboard({ classes }) {
  const [useQuickLinks, setUseQuickLinks] = useState(false);

  return (
    <Fragment>
      <div>Dash board</div>
      <div className={classes.fabContainer}>
        {!useQuickLinks && (
          <div className={classes.quickLinksContainer}>
            <Fab
              aria-label="Add"
              color="primary"
              className={classNames(classes.quickLink, classes.quickLeft)}
              onClick={() => setUseQuickLinks(!useQuickLinks)}
            >
              <AddIcon />
            </Fab>{' '}
            <Fab
              aria-label="Add"
              color="primary"
              className={classNames(classes.quickLink, classes.quickMiddleLeft)}
              onClick={() => setUseQuickLinks(!useQuickLinks)}
            >
              <AddIcon />
            </Fab>{' '}
            <Fab
              aria-label="Add"
              color="primary"
              className={classNames(classes.quickLink, classes.quickMiddle)}
              onClick={() => setUseQuickLinks(!useQuickLinks)}
            >
              <AddIcon />
            </Fab>
            <Fab
              aria-label="Add"
              color="primary"
              className={classNames(classes.quickLink, classes.quickMiddleRight)}
              onClick={() => setUseQuickLinks(!useQuickLinks)}
            >
              <AddIcon />
            </Fab>
            <Fab
              aria-label="Add"
              color="primary"
              className={classNames(classes.quickLink, classes.quickRight)}
              onClick={() => setUseQuickLinks(!useQuickLinks)}
            >
              <AddIcon />
            </Fab>
          </div>
        )}
        <div className={classes.logButtonContainer}>
          <Fab
            aria-label="Add"
            color="primary"
            className={classes.fab}
            onClick={() => setUseQuickLinks(!useQuickLinks)}
            variant="extended"
          >
            <AddIcon /> Log Data
          </Fab>
        </div>
      </div>
    </Fragment>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
