import React from "react";
import PropTypes from "prop-types";
import { Query } from "urql";
import { IonSpinner } from "@ionic/react";
// render props to fetch data with GraphQL render({result, refetch});

const GraphQLFetch = ({ query, variables = {}, render }) => {
  return (
    <Query
      query={query}
      variables={variables}
      requestPolicy="cache-and-network"
    >
      {({ fetching, data, error, executeQuery, extensions }) => {
        if (fetching) {
          return <IonSpinner />;
        } else if (error) {
          return "Error";
        }
        return render({
          data,
          refetch: () => executeQuery({ requestPolicy: "cache-and-network" })
        });
      }}
    </Query>
  );
};

GraphQLFetch.propTypes = {
  query: PropTypes.string.isRequired,
  variables: PropTypes.object,
  render: PropTypes.func.isRequired
};

export default GraphQLFetch;
