import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo';

/** THIS MIGRATION DOES NOT UPDATE THE UI REACTIVELY!! */
function DeleteMutation({ id, query }) {
  return (
    <Mutation
      mutation={query}
      // update={(cache) => {

      // }}
    >
      {deleteMutation => (
        <Button onClick={() => deleteMutation({ variables: { id } })}>Delete</Button>
      )}
    </Mutation>
  );
}

DeleteMutation.propTypes = {
  id: PropTypes.number.isRequired,
  query: PropTypes.object.isRequired
};

export default DeleteMutation;
