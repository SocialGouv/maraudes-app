import React from "react";
import {
  IonList,
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
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonPage,
  IonButton,
  IonFooter
} from "@ionic/react";

import { useHistory } from "react-router";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { fr } from "date-fns/locale";

import { personAdd } from "ionicons/icons";

import ButtonFooter from "../components/ButtonFooter";
import PersonPicker from "../components/PersonPicker";

import persons from "../persons.json";

const formatDueDate = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });

type Person = {
  id: number;
};

export const Persons: React.FC = () => {
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
          onClick={(person: Person) =>
            history.replace(`/persons/${person.id}`)
          }
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