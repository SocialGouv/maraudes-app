import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { fr } from "date-fns/locale";
import { useHistory } from "react-router";
import { useMutation } from "urql";

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
import getTasks from "../queries/getTasks";
import completeTask from "../mutations/completeTask";
import getUserId from "../getUserId";

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

export const Tasks = () => {
  const history = useHistory();
  const currentUserId = getUserId();
  const [, executeMutation] = useMutation(completeTask);
  const onCheckBoxClick = (task, cb) => {
    executeMutation({
      id: task.id,
      completed_by: currentUserId,
      completed_at: new Date().toISOString()
    })
      .then(result => {
        console.log("result", result);
        if (result.error) {
          throw result.error;
        }
        if (cb) {
          cb();
        }
      })
      .catch(e => {
        console.log("e", e);
        alert("Impossible de fermer cette demande :/" + e.message);
      });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Demandes d&apos;aide</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GraphQLFetch
          query={getTasks}
          render={({ data, refetch }) =>
            (data &&
              data.todos.length &&
              data.todos.sort(sortTodos).map(task => (
                <CheckItem
                  key={task.id}
                  rightText={formatDueDate(task.expiration_at)}
                  title={task.person && task.person.title}
                  text={task.title}
                  detail
                  button
                  onClick={() => history.push(`/tasks/${task.id}`)}
                  checkboxProps={{
                    onClick: e => {
                      e.preventDefault();
                      // cancel action when already checked
                      if (!task.completed_at) {
                        onCheckBoxClick(task, refetch);
                      } else {
                        e.target.checked = !e.target.checked;
                      }
                    },
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
