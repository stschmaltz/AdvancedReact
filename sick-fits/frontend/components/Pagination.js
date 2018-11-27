import React from 'react';
import PropTypes from 'prop-types';
import PaginationStyles from './styles/PaginationStyles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { perPage } from '../config';
import Head from 'next/head';
import Link from 'next/link';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = ({ page }) => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return loading;
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        return (
          <PaginationStyles>
            <Head>
              <title>
                Sick Fits! Page {page} of {pages}
              </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: page - 1 },
              }}
            >
              <a className="prev" aria-disabled={page <= 1}>
                ⬅ Prev
              </a>
            </Link>
            <p>
              Sick Fits! Page {page} of {pages}
            </p>
            <p>{count} Items Total</p>
            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: page + 1 },
              }}
            >
              <a className="next" aria-disabled={page >= pages}>
                Next ➡
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

Pagination.propTypes = {};

export default Pagination;
