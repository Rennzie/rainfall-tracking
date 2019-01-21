import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function NewEditForm({ editingId, handleChange, handleMutation, values, setValues }) {
  return (
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
          handleMutation({
            variables: {
              id: editingId,
              rainfall: parseInt(values.rainfall, 10),
              date: moment(values.date).format('YYYY-MM-DD')
            }
          });
          setValues({
            date: moment().format('YYYY-MM-DD'),
            rainfall: 0
          });
        }}
      >
        Add Rainfall
      </Button>
    </Fragment>
  );
}

NewEditForm.propTypes = {
  handleMutation: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  setValues: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  editingId: PropTypes.number
};

export default NewEditForm;
