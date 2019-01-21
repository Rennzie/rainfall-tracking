import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/withRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import withStyles from '@material-ui/core/styles/withStyles';

// Icons
import Home from '@material-ui/icons/Home';
import AnimalIcon from '@material-ui/icons/Pets';

const styles = () => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  }
});

class BottomNav extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClick = destination => () => {
    const { history } = this.props;
    history.push(destination);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Fragment>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction onClick={this.handleClick('/')} label="Home" icon={<Home />} />

          <BottomNavigationAction
            disabled
            onClick={this.handleClick('/manage-categories')}
            label="Categories"
            icon={<AnimalIcon />}
          />

          <BottomNavigationAction
            onClick={this.handleClick('/rainfall')}
            label="Rainfall"
            icon={<FontAwesomeIcon size="2x" icon={['fas', 'cloud-rain']} />}
          />
        </BottomNavigation>
      </Fragment>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(BottomNav));
