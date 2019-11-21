/*
title
people
geo
dueDate

*/

import React from "react";
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
import { RouteComponentProps, useHistory } from "react-router";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";
import { fr } from "date-fns/locale";
import { calendar, pin, stopwatch, person, send } from "ionicons/icons";

import ButtonFooter from "../components/ButtonFooter";

import comments from "../comments.json";
import persons from "../persons.json";

interface TaskPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const Task: React.FC<TaskPageProps> = ({ match }) => {
  const history = useHistory();
  const id = match.params.id;
  const person = persons.find(t => t.id === id);
  if (!person) {
    return (
      <IonPage>
        <div>Personne non trouvée </div>
      </IonPage>
    );
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" text="Retour" />
          </IonButtons>
          <IonTitle>Nouvelle demande</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2 style={{ paddingLeft: 10 }}>Demande pour {person.title}</h2>
        <IonItem>
          <IonLabel position="stacked">Titre de la demande *</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Date d'échéance</IonLabel>
          <IonInput type="date" value="2019-11-01"></IonInput>
          <IonInput type="time" value="09:00"></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Description *</IonLabel>
          <IonTextarea rows={10}></IonTextarea>
        </IonItem>
      </IonContent>
      <ButtonFooter
        text="enregistrer la demande"
        icon={send}
        onClick={() => history.replace("/tasks/1")}
      />
    </IonPage>
  );
};

export default Task;
