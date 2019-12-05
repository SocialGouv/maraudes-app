import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { fr } from "date-fns/locale";
import { useHistory } from "react-router";
import {
  IonCheckbox,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage
} from "@ionic/react";

import GraphQLFetch from "../components/GraphQLFetch";
import ButtonFooter from "../components/ButtonFooter";
import CheckItem from "../components/CheckItem";

const formatDueDate = date =>
  (date &&
    formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr })) ||
  "";

const sortTodos = (a, b) => {
  if (new Date(a.expiration_at) < new Date(b.expiration_at)) {
    return -1;
  } else if (new Date(a.expiration_at) > new Date(b.expiration_at)) {
    return 1;
  }
  return 0;
};

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
    }
  }
}`;

export const Tasks = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Demandes d&apos;aide</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GraphQLFetch
          query={queryTasks}
          render={({ result }) =>
            (result.data &&
              result.data.todos.length &&
              result.data.todos.sort(sortTodos).map(task => (
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
