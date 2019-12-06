import React from "react";
import { useHistory } from "react-router";
import { personAdd } from "ionicons/icons";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonPage
} from "@ionic/react";

import ButtonFooter from "../components/ButtonFooter";
import PersonPicker from "../components/PersonPicker";

const Task = () => {
  const history = useHistory();
  const addPerson = () => {
    const name = prompt("Nom de la personne ?", "");
    if (name) {
      alert("Create person " + name);
      // todo : create person and
      history.replace(`/tasks/create/1`);
    }
  };
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
        <h1 style={{ paddingLeft: 10 }}>Personne bénéficiaire :</h1>
        <PersonPicker
          onClick={person => history.replace(`/tasks/create/${person.id}`)}
        />
      </IonContent>
      <ButtonFooter
        text="nouvelle personne"
        icon={personAdd}
        onClick={addPerson}
      />
    </IonPage>
  );
};

export default Task;
