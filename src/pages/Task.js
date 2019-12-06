import React, { useState } from "react";
import { useHistory } from "react-router";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";
import { fr } from "date-fns/locale";
import { calendar, stopwatch, person, checkmarkCircle } from "ionicons/icons";
import { useMutation } from "urql";

import {
  IonLabel,
  IonContent,
  IonHeader,
  IonIcon,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonRow
} from "@ionic/react";

import AvatarIcon from "../components/AvatarIcon";
import ButtonFooter from "../components/ButtonFooter";
import Comments from "../components/Comments";
import GraphQLFetch from "../components/GraphQLFetch";
import getTask from "../queries/getTask";
import completeTask from "../mutations/completeTask";
import getUserId from "../getUserId";

const frenchDate = date =>
  (date && format(new Date(date), "d MMMM à HH'h'mm", { locale: fr })) || "";

const formatCreationDate = date =>
  (date && formatDistanceToNow(new Date(date), { locale: fr })) || "";

const TaskChip = ({
  avatarStyle = {},
  icon = {},
  text = "",
  onClick = () => {}
}) => (
  <IonChip onClick={onClick}>
    <AvatarIcon icon={icon} style={avatarStyle} />
    <IonLabel>{text}</IonLabel>
  </IonChip>
);

const Task = ({ match }) => {
  const taskId = match.params.id;
  const history = useHistory();
  const currentUserId = getUserId();
  const [, executeMutation] = useMutation(completeTask);

  const closeTask = () => {
    const yes = window.confirm("Voulez-vous vraiment fermer cette demande ?");
    if (yes) {
      // todo
      executeMutation({
        id: taskId,
        completed_by: currentUserId,
        completed_at: new Date().toISOString()
      })
        .then(result => {
          console.log("result", result);
          if (result.error) {
            throw result.error;
          }
          // setStatus("success");
          history.push(`/tasks?r=${Math.random()}`);
        })
        .catch(e => {
          console.log("e", e);
          //setStatus("error");
          alert("Impossible de fermer cette demande :/" + e.message);
        });
    }
  };

  return (
    <IonPage>
      <GraphQLFetch
        query={getTask}
        variables={{ id: taskId }}
        render={({ data }) => {
          const task = data.todo;
          return (
            <React.Fragment>
              <IonHeader>
                <IonToolbar color="primary">
                  <IonButtons slot="start">
                    <IonBackButton defaultHref="/tasks" text="Retour" />
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonCard class="card">
                  <IonCardHeader>
                    <IonCardSubtitle>
                      <IonIcon
                        size="small"
                        icon={calendar}
                        style={{ verticalAlign: "bottom", marginRight: "5px" }}
                      />
                      {frenchDate(task.expiration_at)}{" "}
                    </IonCardSubtitle>
                    <IonCardTitle>{task.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent style={{ paddingTop: 0 }}>
                    <TaskChip
                      icon={person}
                      text={task.person.title}
                      avatarStyle={{ background: "var(--ion-color-primary)" }}
                      onClick={() => history.push(`/persons/${task.person.id}`)}
                    />
                    <TaskChip
                      icon={stopwatch}
                      text={`Crée par ${
                        task.created_user.username
                      } il y a ${formatCreationDate(task.created_at)}`}
                      avatarStyle={{ background: "var(--ion-color-warning)" }}
                    />
                    {task.completed_at && (
                      <TaskChip
                        icon={checkmarkCircle}
                        text={`fermé par ${
                          task.completed_user.username
                        } il y a ${formatCreationDate(task.completed_at)}`}
                        avatarStyle={{ background: "var(--ion-color-success)" }}
                      />
                    )}

                    <IonRow style={{ marginTop: 30, fontSize: "1rem" }}>
                      {task.text}
                    </IonRow>
                  </IonCardContent>
                </IonCard>
                <React.Fragment>
                  <h3 style={{ paddingLeft: 20 }}>Notes</h3>
                  <Comments todo_id={task.id} />
                </React.Fragment>
              </IonContent>
              {!task.completed_at && (
                <ButtonFooter
                  text="Clotûrer la demande"
                  color="success"
                  icon={checkmarkCircle}
                  onClick={closeTask}
                />
              )}
            </React.Fragment>
          );
        }}
      />
    </IonPage>
  );
};

export default Task;
