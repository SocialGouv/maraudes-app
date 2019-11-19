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

const Task: React.FC<TaskPageProps> = ({ match }) => {
  const id = match.params.id;
  const task = todo.find(t => t.id === id);
  const history = useHistory();
  const header = (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tasks" text="Retour" />
        </IonButtons>
        <IonTitle>{(task && task.title) || "Demande non trouvée"}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );

  if (!task) {
    return (
      <IonPage>
        {header}
        <IonContent>Demande non trouvée</IonContent>
      </IonPage>
    );
  }

  const closeTask = () => {
    const yes = window.confirm("Voulez-vous vraiment fermer cette demande ?");
    if (yes) {
      history.push("/tasks");
    }
  };

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
            <TaskChip
              icon={person}
              text={task.person}
              avatarStyle={{ background: "var(--ion-color-primary)" }}
              onClick={() => history.push(`/community/1`)}
            />
            <TaskChip
              icon={stopwatch}
              text={`Crée par ${task.author} il y a ${formatCreationDate(
                task.creationDate
              )}`}
              avatarStyle={{ background: "var(--ion-color-warning)" }}
            />
            {task.completedDate && (
              <TaskChip
                icon={checkmarkCircle}
                text={`fermé par ${
                  task.completedBy
                } il y a ${formatCreationDate(task.completedDate)}`}
                avatarStyle={{ background: "var(--ion-color-success)" }}
              />
            )}

            <IonRow style={{ marginTop: 30, fontSize: "1rem" }}>
              {task.description}
            </IonRow>
          </IonCardContent>
        </IonCard>
        <React.Fragment>
          <h3 style={{ paddingLeft: 20 }}>Notes</h3>
          <Comments />
        </React.Fragment>
      </IonContent>
      {!task.completedDate && (
        <ButtonFooter
          text="Clotûrer la demande"
          color="success"
          icon={checkmarkCircle}
          onClick={closeTask}
        />
      )}
    </IonPage>
  );
};

export default Task;
