import React, { useState } from "react";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import { personAdd } from "ionicons/icons";
import { useMutation } from "urql";
import uuidv4 from "uuid/v4";

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonPage
} from "@ionic/react";

import ButtonFooter from "../components/ButtonFooter";
import PersonPicker from "../components/PersonPicker";
import createPerson from "../mutations/createPerson";
import getUserId from "../getUserId";

const Task = props => {
  const history = useHistory();

  const [status, setStatus] = useState("idle");
  const [, executeMutation] = useMutation(createPerson);
  const currentUserId = getUserId();

  const addPerson = () => {
    const name = prompt("Nom de la personne ?", "");
    if (name) {
      const uuid = uuidv4();
      executeMutation({
        id: uuid,
        title: name
      })
        .then(result => {
          if (result.error) {
            alert("Impossible d'envoyer la demande :/");
            throw result.error;
          }
          setStatus("success");
          if (props.destination === "createTask") {
            history.replace(`/tasks/create/${uuid}`);
          } else if (props.destination === "createPerson") {
            history.replace(`/persons/${uuid}`);
          }
        })
        .catch(e => {
          console.log("e", e);
          setStatus("error");
        });
    }
  };

  if (!currentUserId) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" text="Retour" />
          </IonButtons>
          <IonTitle>{props.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PersonPicker
          onClick={person => {
            if (props.destination === "createTask") {
              history.replace(`/tasks/create/${person.id}`);
            } else if (props.destination === "createPerson") {
              history.replace(`/persons/${person.id}`);
            }
          }}
        />
      </IonContent>
      <ButtonFooter
        text="nouvelle personne"
        icon={personAdd}
        onClick={addPerson}
      />
    </IonPage>
  );
};

export default Task;
