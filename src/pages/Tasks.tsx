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

import GraphQLFetch from "../components/GraphQLFetch";
import ButtonFooter from "../components/ButtonFooter";
import CheckItem from "../components/CheckItem";
import todo from "../todo.json";

import { checkmarkCircle, send } from "ionicons/icons";

const formatDueDate = (date: string) =>
  (date &&
    formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr })) ||
  "";

type TodoItem = {
  expiration_at: string;
};

type Todos = [TodoItem];

const sortTodos = (a: TodoItem, b: TodoItem) => {
  if (new Date(a.expiration_at) < new Date(b.expiration_at)) {
    return -1;
  } else if (new Date(a.expiration_at) > new Date(b.expiration_at)) {
    return 1;
  }
  return 0;
};

type TodosState = [Todos];

const queryTasks = `{
  todos {
    id
    title
    expiration_at
    created_at
    created_user {
      username
    }
    completed_at
    completed_user {
      username
    }
    person {
      title
    }
    messages(order_by: {created_at: desc}) {
      id
      created_at
      created_user {
        username
      }
    }
  }
}`;

export const Tasks: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Demandes d'aide</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GraphQLFetch
          query={queryTasks}
          render={({ result }) =>
            (result.data &&
              result.data.todos.length &&
              result.data.todos.sort(sortTodos).map((task: any) => (
                <CheckItem
                  key={task.id}
                  rightText={formatDueDate(task.expiration_at)}
                  title={task.person && task.person.title}
                  text={task.title}
                  detail
                  button
                  onClick={() => history.push(`/tasks/${task.id}`)}
                  checkboxProps={{
                    checked: !!task.completed_at,
                    children: <IonCheckbox />
                  }}
                />
              ))) || <div>Aucune demande en cours</div>
          }
        />
      </IonContent>
      <ButtonFooter
        text="nouvelle demande"
        onClick={() => history.push("/tasks/create")}
      />
    </IonPage>
  );
};

export default Tasks;
