import React from "react";
import { useHistory } from "react-router";
import format from "date-fns/format";
import { fr } from "date-fns/locale";
import { useMutation } from "urql";
import {
  IonCheckbox,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from "@ionic/react";

import CheckItem from "../components/CheckItem";
import ButtonFooter from "../components/ButtonFooter";
import Comments from "../components/Comments";
import GraphQLFetch from "../components/GraphQLFetch";
import getPerson from "../queries/getPerson";
import completeTask from "../mutations/completeTask";
import getUserId from "../getUserId";

const frenchDate = date =>
  (date && format(new Date(date), "d MMMM à HH'h'mm", { locale: fr })) || "";

const Task = ({ match }) => {
  const personId = match.params.id;
  const history = useHistory();
  const currentUserId = getUserId();
  const [, executeMutation] = useMutation(completeTask);
  const onTaskCheckBoxClick = (task, cb) => {
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
          <IonButtons slot="start">
            <IonBackButton defaultHref="/persons" text="Retour" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GraphQLFetch
          query={getPerson}
          variables={{ id: personId }}
          render={({ data, refetch }) => {
            const person = data.person;
            console.log("person", person);
            return (
              <div>
                <IonCard class="card">
                  <IonCardHeader>
                    <IonCardTitle>{person.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent style={{ paddingTop: 0 }}>
                    infos personne
                  </IonCardContent>
                </IonCard>
                <h3 style={{ paddingLeft: 20 }}>Demandes en cours</h3>
                {(person.todos && person.todos.length !== 0 && (
                  <div>
                    {person.todos.map(task => (
                      <CheckItem
                        key={task.id}
                        rightText={frenchDate(task.created_at)}
                        title={task.title}
                        text={task.text}
                        onClick={() => history.push(`/tasks/${task.id}`)}
                        details
                        button
                        checkboxProps={{
                          checked: !!task.completed_at,
                          children: <IonCheckbox />,
                          // cant change state from this page.
                          onClick: e => {
                            e.preventDefault();
                            // cancel action when already checked
                            if (!task.completed_at) {
                              onTaskCheckBoxClick(task, refetch);
                            } else {
                              e.target.checked = !e.target.checked;
                            }
                          }
                        }}
                      />
                    ))}
                  </div>
                )) || (
                  <div style={{ paddingLeft: 40 }}>Aucune demande en cours</div>
                )}
                <h3 style={{ paddingLeft: 20 }}>Notes</h3>
                <Comments person_id={person.id} />
                <ButtonFooter
                  text="nouvelle demande"
                  onClick={() => history.push(`/tasks/create/${person.id}`)}
                />
              </div>
            );
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Task;
