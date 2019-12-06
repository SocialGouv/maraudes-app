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

  // const [result, executeQuery] = useQuery({
  //   query,
  //   variables,
  //   requestPolicy: "network-only"
  // });

  // //console.log("GraphQLFetch", query, variables, result);

  // if (result.error) return <div>Erreur :/ {result.error.message}</div>;
  // const finished = !result.fetching && !result.error;
  // const refetch = () => executeQuery({ requestPolicy: "network-only" });
  // if (finished) {
  //   return render({
  //     result,
  //     refetch
  //   });
  // }
  // return <div>chargement...</div>;
};

GraphQLFetch.propTypes = {
  query: PropTypes.string.isRequired,
  variables: PropTypes.object,
  render: PropTypes.func.isRequired
};

export default GraphQLFetch;
