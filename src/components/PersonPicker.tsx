import React from "react";

import persons from "../persons.json";

import { person } from "ionicons/icons";

import {
  IonList,
  IonText,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonRadio,
  IonCheckbox,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonListHeader,
  IonContent,
  IonAvatar,
  IonFooter,
  IonHeader,
  IonIcon,
  IonButton,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonTextarea,
  IonRow
} from "@ionic/react";

type PeoplePickerProps = {
  onClick: Function;
};

const PeoplePicker = ({ onClick }: PeoplePickerProps) => (
  <React.Fragment>
    {persons.map(entry => (
      <IonItem key={entry.id} detail button onClick={() => onClick(entry)} lines="none">
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
