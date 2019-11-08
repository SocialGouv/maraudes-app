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

import todo from "../todo.json";

const formatDueDate = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });

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
        <IonItem key={entry.id} detail button href={`/task/${entry.id}`}>
          <IonAvatar slot="start" style={{ background: "#3880ff" }} />
          <IonLabel>
            <h2>{entry.people}</h2>
            <h3>{entry.title}</h3>
          </IonLabel>
          <IonLabel slot="end">
            <h3 style={{ textAlign: "right", marginRight: 10 }}>
              {formatDueDate(entry.dueDate)}
            </h3>
          </IonLabel>
        </IonItem>
      ))}
    </IonContent>
  </IonPage>
);

export default Tasks;
