import React from "react";
import { useQuery } from "urql";

type FetchProps = {
  query: string;
  render(result: any): any;
};

const GraphQLFetch: React.SFC<FetchProps> = ({ query, render }) => {
  const [result] = useQuery({
    query,
    context: {
      fetchOptions: {
        headers: {
          "x-hasura-admin-secret": "secret"
        }
      }
    }
  });
  console.log("result", result);

  if (result.error) return <div>Erreur :/ {result.error.message}</div>;
  const finished = !result.fetching && !result.error;
  if (finished) {
    return render({
      result
    });
  }
  return <div>chargement...</div>;
};

export default GraphQLFetch;
