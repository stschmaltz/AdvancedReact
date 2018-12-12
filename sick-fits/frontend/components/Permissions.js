import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import { Query, Mutation } from 'react-apollo';

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = props => {
  return (
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => (
        <div>
          <Error error={error} />
          <div />
        </div>
      )}
    </Query>
  );
};

Permissions.propTypes = {};

export default Permissions;
