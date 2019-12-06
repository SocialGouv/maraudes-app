import React from "react";
import PropTypes from "prop-types";
import { Query } from "urql";

// render props to fetch data with GraphQL render({result, refetch});

const GraphQLFetch = ({ query, variables = {}, render }) => {
  console.log("GraphQLFetch");
  return (
    <Query query={query} variables={variables} requestPolicy="network-only">
      {({ fetching, data, error, executeQuery, extensions }) => {
        if (fetching) {
          return "Loading...";
        } else if (error) {
          return "Oh no!";
        }
        console.log("data", data);
        //return <div>io</div>;
        return render({
          data,
          refetch: () => executeQuery({ requestPolicy: "network-only" })
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
