import React from "react";
import { useHistory } from "react-router";
import format from "date-fns/format";
import { fr } from "date-fns/locale";

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

const frenchDate = date =>
  format(new Date(date), "d MMMM à HH'h'mm", { locale: fr });

const Task = ({ match }) => {
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
          <Comments person_id={person.id} />
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
