import React from "react";
import PropTypes from "prop-types";
import { Query } from "urql";
import { IonButton, IonSpinner } from "@ionic/react";
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
          return (
            <div style={{ textAlign: "center", marginTop: "20vh" }}>
              <IonSpinner />
            </div>
          );
        } else if (error) {
          return (
            <div style={{ textAlign: "center", marginTop: "20vh" }}>
              Une erreur est apparue :/
              <br />
              <br />
              <br />
              <br />
              <IonButton onClick={() => document.location.reload()}>
                Recharger l&apos;application
              </IonButton>
            </div>
          );
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
