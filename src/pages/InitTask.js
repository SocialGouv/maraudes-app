import React from "react";
import { useHistory } from "react-router";
import { send } from "ionicons/icons";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonPage,
  IonTextarea
} from "@ionic/react";

import ButtonFooter from "../components/ButtonFooter";

const InitTask = ({ match }) => {
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
          <IonLabel position="stacked">Date d&apos;échéance</IonLabel>
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

export default InitTask;
