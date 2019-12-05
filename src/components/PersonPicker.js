import React from "react";

import { person } from "ionicons/icons";

import { IonItem, IonLabel, IonAvatar, IonIcon } from "@ionic/react";

const PeoplePicker = ({ onClick }: PeoplePickerProps) => (
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

export default PeoplePicker;
