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
  IonPage
} from "@ionic/react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { fr } from "date-fns/locale";

import AvatarItem from "../components/AvatarItem";
import todo from "../todo.json";

const formatDueDate = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr }) || "";

export const Tasks: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Tâches</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
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
  </IonPage>
);

export default Tasks;
