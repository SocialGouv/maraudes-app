import React from "react";
import { useQuery } from "urql";

const GraphQLFetch = ({ query, variables = {}, render }) => {
  console.log("variables", variables);
  const [result, executeQuery] = useQuery({
    query,
    variables
  });

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

export default GraphQLFetch;
