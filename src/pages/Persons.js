import React from "react";
import { useHistory } from "react-router";
import { personAdd } from "ionicons/icons";

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage
} from "@ionic/react";

import ButtonFooter from "../components/ButtonFooter";
import PersonPicker from "../components/PersonPicker";

export const Persons = () => {
  const history = useHistory();

  const addPerson = () => {
    const name = prompt("Nom de la personne ?", "");
    if (name) {
      alert("Create person " + name);
      // todo : create person and
      history.replace(`/persons/1`);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Personnes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PersonPicker
          onClick={person => history.replace(`/persons/${person.id}`)}
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

export default Persons;
