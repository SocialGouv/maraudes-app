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
import { calendar, pin, stopwatch, person, send } from "ionicons/icons";

import AvatarItem from "../components/AvatarItem";
import CheckItem from "../components/CheckItem";
import ButtonFooter from "../components/ButtonFooter";
import Comments from "../components/Comments";

import persons from "../persons.json";
import comments from "../comments.json";
import todo from "../todo.json";

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
  const person = persons.find(t => t.id === id);
  const header = (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/persons" text="Retour" />
        </IonButtons>
        <IonTitle>{(person && person.title) || "Demande non trouvée"}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );

  if (!person) {
    return <IonPage>Not found</IonPage>;
  }

  const tasks = todo.filter(t => t.person === person.title);

  return (
    <IonPage>
      {header}
      <IonContent>
        <IonCard class="card">
          <IonCardHeader>
            <IonCardTitle>{person.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={{ paddingTop: 0 }}>
            infos personne
          </IonCardContent>
        </IonCard>
        {tasks.length !== 0 && (
          <React.Fragment>
            <h3 style={{ paddingLeft: 20 }}>Demandes en cours</h3>
            {tasks.map(task => (
              <CheckItem
                key={task.id}
                rightText={frenchDate(task.creationDate)}
                title={task.title}
                text={task.description}
                onClick={() => history.push(`/tasks/${task.id}`)}
                details
                button
                checkboxProps={{
                  checked: !!task.completedDate,
                  children: <IonCheckbox />
                }}
              />
            ))}
          </React.Fragment>
        )}
        <React.Fragment>
          <h3 style={{ paddingLeft: 20 }}>Notes</h3>
          <Comments />
        </React.Fragment>
      </IonContent>
      <ButtonFooter
        text="nouvelle demande"
        onClick={() => history.push(`/tasks/create/${person.id}`)}
      />
    </IonPage>
  );
};

export default Task;
