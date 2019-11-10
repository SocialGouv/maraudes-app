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

import community from "../community.json";

const formatDueDate = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });

export const Community: React.FC = () => {
  const history = useHistory();

  const addPerson = () => {
    const name = prompt("Nom de la personne ?", "");
    if (name) {
      alert("Create person " + name);
      // todo : create person and
      history.replace(`/community/1`);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="Retour" />
          </IonButtons>
          <IonTitle>Communauté</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {community.map(entry => (
          <IonItem
            key={entry.id}
            detail
            button
            onClick={() => history.push(`/community/${entry.id}`)}
          >
            <IonAvatar slot="start" style={{ background: "#3880ff" }} />
            <IonLabel>
              <h2>{entry.title}</h2>
            </IonLabel>
          </IonItem>
        ))}
      </IonContent>
      <ButtonFooter
        text="nouvelle personne"
        icon={personAdd}
        onClick={addPerson}
      />
    </IonPage>
  );
};

export default Community;
