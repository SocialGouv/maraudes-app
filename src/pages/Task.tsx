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
import { RouteComponentProps } from "react-router";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";
import { fr } from "date-fns/locale";
import { calendar, pin, stopwatch, person } from "ionicons/icons";

import todo from "../todo.json";
import comments from "../comments.json";

const frenchDate = (date: string) =>
  format(new Date(date), "d MMMM à HH'h'mm", { locale: fr });

const formatCreationDate = (date: string) =>
  formatDistanceToNow(new Date(date), { locale: fr });

interface TaskPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const Task: React.FC<TaskPageProps> = ({ match }) => {
  const id = match.params.id;
  const task = todo.find(t => t.id === id);
  const header = (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tasks" />
        </IonButtons>
        <IonTitle>{(task && task.title) || "Tâche non trouvée"}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );

  if (!task) {
    return (
      <IonPage>
        {header}
        <IonContent>Tâche non trouvée</IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      {header}
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>
              <IonIcon
                size="small"
                icon={calendar}
                style={{ verticalAlign: "bottom", marginRight: "5px" }}
              />
              {frenchDate(task.dueDate)}{" "}
            </IonCardSubtitle>
            <IonCardTitle>{task.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={{ paddingTop: 0 }}>
            <IonChip>
              <IonAvatar style={{ background: "#3880ff" }}>
                <IonIcon
                  icon={person}
                  style={{ width: "100%", height: "70%", marginTop: "15%" }}
                />
              </IonAvatar>
              <IonLabel> {task.people}</IonLabel>
            </IonChip>
            <IonChip>
              <IonAvatar style={{ background: "#ffce00" }}>
                <IonIcon
                  icon={stopwatch}
                  style={{ width: "100%", height: "70%", marginTop: "15%" }}
                />
              </IonAvatar>
              <IonLabel>
                {task.author} il y a {formatCreationDate(task.creationDate)}
              </IonLabel>
            </IonChip>
            <IonChip>
              <IonAvatar style={{ background: "#0ec254" }}>
                <IonIcon
                  icon={pin}
                  style={{ width: "100%", height: "70%", marginTop: "15%" }}
                />
              </IonAvatar>
              <IonLabel>Lieu : ?</IonLabel>
            </IonChip>
            <IonRow style={{ marginTop: 30, fontSize: "1rem" }}>
              {task.description}
            </IonRow>
          </IonCardContent>
        </IonCard>
        {comments.map(comment => (
          <IonItem key={comment.id}>
            <IonAvatar
              slot="start"
              style={{
                alignSelf: "end",
                marginTop: "1.5em",
                background: "#3880ff"
              }}
            />
            <IonLabel>
              <h3 slot="end" style={{ textAlign: "right", marginRight: 10 }}>
                {frenchDate(comment.creationDate)}
              </h3>
              <h2>{comment.from}</h2>
              <p className="ion-text-wrap">{comment.message}</p>
            </IonLabel>
          </IonItem>
        ))}
        <IonItem style={{ marginTop: 20 }}>
          <IonAvatar
            slot="start"
            style={{ alignSelf: "end", background: "#0ec254" }}
          />
          <IonTextarea
            style={{ fontSize: "0.9em", height: 100 }}
            placeholder="ajouter une note"
          />
          <IonButton color="primary">Envoyer</IonButton>
        </IonItem>
      </IonContent>
      <IonFooter>
        <IonToolbar className="ion-text-center">
          <IonButton color="success">Demande terminée</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Task;
