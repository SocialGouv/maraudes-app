import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "urql";

// render props to fetch data with GraphQL render({result, refetch});

const GraphQLFetch = ({ query, variables = {}, render }) => {
  const [result, executeQuery] = useQuery({
    query,
    variables
  });

  console.log("GraphQLFetch", query, variables, result);

  if (result.error) return <div>Erreur :/ {result.error.message}</div>;
  const finished = !result.fetching && !result.error;
  const refetch = () => executeQuery({ requestPolicy: "network-only" });
  if (finished) {
    return render({
      result,
      refetch
    });
  }
  return <div>chargement...</div>;
};

GraphQLFetch.propTypes = {
  query: PropTypes.string.isRequired,
  variables: PropTypes.object,
  render: PropTypes.func.isRequired
};

export default GraphQLFetch;