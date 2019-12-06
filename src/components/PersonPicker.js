import React from "react";
import PropTypes from "prop-types";
import { person } from "ionicons/icons";
import { IonItem, IonLabel, IonAvatar, IonIcon } from "@ionic/react";

import GraphQLFetch from "./GraphQLFetch";
import personsList from "../queries/personsList";

const PeoplePicker = ({ onClick }) => (
  <GraphQLFetch
    query={personsList}
    render={({ data }) => {
      const persons = data.persons;
      return (
        <React.Fragment>
          {persons.map(entry => (
            <IonItem
              key={entry.id}
              detail
              button
              onClick={() => onClick(entry)}
              lines="none"
            >
              <IonAvatar slot="start" style={{ background: "#3880ff" }}>
                <IonIcon
                  icon={person}
                  style={{
                    width: "100%",
                    fill: "white",
                    height: "60%",
                    marginTop: "22%"
                  }}
                />
              </IonAvatar>
              <IonLabel>
                <h2>{entry.title}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </React.Fragment>
      );
    }}
  />
);

PeoplePicker.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default PeoplePicker;
