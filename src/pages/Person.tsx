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
import { RouteComponentProps, useHistory } from "react-router";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";
import { fr } from "date-fns/locale";
import { calendar, pin, stopwatch, person } from "ionicons/icons";

import AvatarItem from "../components/AvatarItem";
import ButtonFooter from "../components/ButtonFooter";
import Comments from "../components/Comments";

import community from "../community.json";
import comments from "../comments.json";

const frenchDate = (date: string) =>
  format(new Date(date), "d MMMM à HH'h'mm", { locale: fr });

const formatCreationDate = (date: string) =>
  formatDistanceToNow(new Date(date), { locale: fr });

interface TaskPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const TaskChip = ({ avatarStyle = {}, icon = {}, text = "" }) => (
  <IonChip>
    <IonAvatar style={{ background: "#ffce00", ...avatarStyle }}>
      {icon && (
        <IonIcon
          icon={icon}
          style={{ width: "100%", height: "70%", marginTop: "15%" }}
        />
      )}
    </IonAvatar>
    <IonLabel>{text}</IonLabel>
  </IonChip>
);

const Task: React.FC<TaskPageProps> = ({ match }) => {
  const id = match.params.id;
  const history = useHistory();
  const person = community.find(t => t.id === id);
  const header = (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/community" text="Retour" />
        </IonButtons>
        <IonTitle>{(person && person.title) || "Demande non trouvée"}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );

  if (!person) {
    return (
      <IonPage>
        {header}
        <IonContent>Personne non trouvée</IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      {header}
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{person.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={{ paddingTop: 0 }}>
            infos personne
          </IonCardContent>
        </IonCard>
        <Comments />
      </IonContent>
      <ButtonFooter
        text="nouvelle demande"
        onClick={() => history.push(`/tasks/create/${person.id}`)}
      />
    </IonPage>
  );
};

export default Task;
