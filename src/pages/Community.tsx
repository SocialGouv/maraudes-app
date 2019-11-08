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

import community from "../community.json";

const formatDueDate = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });

export const Community: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Communauté</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {community.map(entry => (
        <IonItem key={entry.id} detail button href={`/community/${entry.id}`}>
          <IonAvatar slot="start" style={{ background: "#3880ff" }} />
          <IonLabel>
            <h2>{entry.title}</h2>
          </IonLabel>
        </IonItem>
      ))}
    </IonContent>
  </IonPage>
);

export default Community;
