import React from "react";

import community from "../community.json";

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
    {community.map(entry => (
      <IonItem key={entry.id} detail button onClick={() => onClick(entry)}>
        <IonAvatar slot="start" style={{ background: "#3880ff" }} />
        <IonLabel>
          <h2>{entry.title}</h2>
        </IonLabel>
      </IonItem>
    ))}
  </React.Fragment>
);

export default PeoplePicker;
