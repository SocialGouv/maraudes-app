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
  IonFooter,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonPage,
  IonButton
} from "@ionic/react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { fr } from "date-fns/locale";
import { useHistory } from "react-router";

import ButtonFooter from "../components/ButtonFooter";
import AvatarItem from "../components/AvatarItem";
import todo from "../todo.json";

const formatDueDate = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr }) || "";

export const Tasks: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="Retour" />
          </IonButtons>
          <IonTitle>Demandes d'aide</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {todo.length === 0 && (
          <h3 style={{ textAlign: "center", marginTop: "20vh" }}>
            Aucune demande actuellement !
          </h3>
        )}
        {todo.map(entry => (
          <AvatarItem
            key={entry.id}
            rightText={formatDueDate(entry.dueDate)}
            title={entry.people}
            avatarStyle={{}}
            text={entry.title}
            detail
            button
            href={`/tasks/${entry.id}`}
          />
        ))}
      </IonContent>
      <ButtonFooter
        text="nouvelle demande"
        onClick={() => history.push("/tasks/create")}
      />
    </IonPage>
  );
};

export default Tasks;
