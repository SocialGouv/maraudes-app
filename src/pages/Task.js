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
import {
  calendar,
  pin,
  stopwatch,
  person,
  checkmarkCircle
} from "ionicons/icons";

import AvatarItem from "../components/AvatarItem";
import AvatarIcon from "../components/AvatarIcon";
import ButtonFooter from "../components/ButtonFooter";
import Comments from "../components/Comments";
import GraphQLFetch from "../components/GraphQLFetch";

//import todo from "../todo.json";
//import comments from "../comments.json";

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

const queryTask = `{
  todos_by_pk(id: "7271fcea-d7e0-44cf-b169-5a3b13f6d111") {
    id
    title
    text
    person{
      title
    }
    created_user{
      username
    }
    created_at
    completed_at
    completed_user{
      username
    }
    expiration_at
  }
}`;

const Task = ({ match }) => {
  const id = match.params.id;
  //  const task = todo.find(t => t.id === id);
  const history = useHistory();
  const header = (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tasks" text="Retour" />
        </IonButtons>
        {/*<IonTitle>{(task && task.title) || "Demande non trouvée"}</IonTitle>*/}
      </IonToolbar>
    </IonHeader>
  );

  const closeTask = () => {
    const yes = window.confirm("Voulez-vous vraiment fermer cette demande ?");
    if (yes) {
      // todo
      history.push("/tasks");
    }
  };

  return (
    <IonPage>
      <GraphQLFetch
        query={queryTask}
        render={({ result }) => {
          const task = result.data.todos_by_pk;
          return (
            <React.Fragment>
              {header}
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
                      onClick={() => history.push(`/persons/1`)}
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
