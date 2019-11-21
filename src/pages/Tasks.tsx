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
  IonFooter,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonPage,
  IonButton,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { fr } from "date-fns/locale";
import { useHistory } from "react-router";

import ButtonFooter from "../components/ButtonFooter";
import CheckItem from "../components/CheckItem";
import todo from "../todo.json";

import { checkmarkCircle, send } from "ionicons/icons";

const formatDueDate = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr }) || "";

export const Tasks: React.FC = () => {
  const history = useHistory();
  const sortedTodo = todo.sort((a, b) => {
    if (new Date(a.dueDate) < new Date(b.dueDate)) {
      return -1;
    } else if (new Date(a.dueDate) > new Date(b.dueDate)) {
      return 1;
    }
    return 0;
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Demandes d'aide</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {todo.length === 0 && (
          <h3 style={{ textAlign: "center", marginTop: "20vh" }}>
            Aucune demande actuellement !
          </h3>
        )}
        {todo.map(entry => (
          <CheckItem
            key={entry.id}
            rightText={formatDueDate(entry.dueDate)}
            title={entry.person}
            text={entry.title}
            detail
            button
            onClick= {() => history.push(`/tasks/${entry.id}`) }
            checkboxProps={{
              checked: !!entry.completedDate,
              children: <IonCheckbox />
            }}
          />
        ))}
      </IonContent>
      <ButtonFooter
        text="nouvelle demande"
        onClick={() => history.push("/tasks/create")}
      />
    </IonPage>
  );
};

export default Tasks;
