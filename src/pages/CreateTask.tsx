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
import { useHistory } from "react-router";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";
import { fr } from "date-fns/locale";
import { calendar, pin, stopwatch, person, personAdd } from "ionicons/icons";

import ButtonFooter from "../components/ButtonFooter";
import PeoplePicker from "../components/PeoplePicker";

import comments from "../comments.json";
import community from "../community.json";

type Person = {
  id: number;
};

const Task: React.FC = () => {
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
        <PeoplePicker
          onClick={(person: Person) =>
            history.replace(`/tasks/create/${person.id}`)
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

export default Task;
