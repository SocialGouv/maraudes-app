import React from "react";
import AvatarItem from "../components/AvatarItem";

import format from "date-fns/format";
import { fr } from "date-fns/locale";

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

import comments from "../comments.json";

import { text } from "ionicons/icons";

const frenchDate = (date: string) =>
  format(new Date(date), "d MMMM à HH'h'mm", { locale: fr });

const TextIcon = () => (
  <IonIcon
    icon={text}
    style={{ width: "100%", height: "60%", marginTop: "22%", fill: "white" }}
  />
);

const Comments = () => (
  <React.Fragment>
    {comments.map(comment => (
      <AvatarItem
        key={comment.id}
        rightText={frenchDate(comment.creationDate)}
        title={comment.from}
        text={comment.message}
        avatarProps={{
          children: <TextIcon />
        }}
      />
    ))}
    <IonItem style={{ marginTop: 20 }}>
      <IonAvatar
        slot="start"
        style={{ alignSelf: "end", background: "var(--ion-color-success)" }}
      >
        <TextIcon />
      </IonAvatar>
      <IonTextarea
        style={{ fontSize: "0.9em", height: 100 }}
        placeholder="ajouter une note"
      />
      <IonButton color="primary">Envoyer</IonButton>
    </IonItem>
  </React.Fragment>
);

export default Comments;
