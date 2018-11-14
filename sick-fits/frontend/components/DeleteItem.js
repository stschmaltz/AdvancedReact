import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem = props => {
  const update = (cache, payload) => {
    //manually update cache on client so it matches server
    // 1. read the cache for the item we want
    const allData = cache.readQuery({ query: ALL_ITEMS_QUERY });
    console.log(allData, payload);

    // 2. filter the deleted item out
    const filteredData = {
      ...allData,
      items: [
        ...allData.items.filter(item => item.id !== payload.data.deleteItem.id),
      ],
    };

    // 3. put items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data: filteredData });
  };

  return (
    <Mutation
      mutation={DELETE_ITEM_MUTATION}
      variables={{ id: props.id }}
      update={update}
    >
      {(deleteItem, { error }) => (
        <button
          onClick={() => {
            if (confirm('Are you sure you want to delete this item?')) {
              deleteItem();
            }
          }}
        >
          {props.children}
        </button>
      )}
    </Mutation>
  );
};

DeleteItem.propTypes = {};

export default DeleteItem;
