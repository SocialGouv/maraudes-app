import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { useMutation } from "urql";
import uuidv4 from "uuid/v4";
import { send } from "ionicons/icons";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonPage,
  IonTextarea
} from "@ionic/react";

import ButtonFooter from "../components/ButtonFooter";
import GraphQLFetch from "../components/GraphQLFetch";
import personInfo from "../queries/personInfo";
import createTask from "../mutations/createTask";

const InitTask = ({ match }) => {
  const id = match.params.id;

  const [values, setValues] = useState({ person_id: id });
  const [status, setStatus] = useState("idle");
  const [, executeMutation] = useMutation(createTask);
  const history = useHistory();

  const onSubmit = () => {
    const uuid = uuidv4();
    setStatus("submitting");
    executeMutation({
      id: uuid,
      ...values
    })
      .then(result => {
        console.log("result", result);
        if (result.error) {
          alert("Impossible d'envoyer le message :/");
          throw result.error;
        }
        setStatus("error");
        history.replace(`/tasks/${uuid}`);
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" text="Retour" />
          </IonButtons>
          <IonTitle>Nouvelle demande</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GraphQLFetch
          query={personInfo}
          variables={{ id }}
          render={({ result }) => {
            const person = result.data && result.data.person;
            return (
              <React.Fragment>
                <h2 style={{ paddingLeft: 10 }}>Demande pour {person.title}</h2>
                <IonItem>
                  <IonLabel position="stacked">Titre de la demande *</IonLabel>
                  <IonInput
                    onKeyUp={e =>
                      setValues({ ...values, title: e.target.value })
                    }
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Date d&apos;échéance</IonLabel>
                  <IonInput
                    onBlur={e =>
                      console.log(e.target.value) ||
                      setValues({ ...values, date: e.target.value })
                    }
                    type="date"
                    value="2019-11-01"
                  ></IonInput>
                  <IonInput
                    onBlur={e => setValues({ ...values, time: e.target.value })}
                    type="time"
                    value="09:00"
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Description *</IonLabel>
                  <IonTextarea
                    onKeyUp={e =>
                      setValues({ ...values, text: e.target.value })
                    }
                    rows={10}
                  ></IonTextarea>
                </IonItem>
              </React.Fragment>
            );
          }}
        />
      </IonContent>
      <ButtonFooter
        text="enregistrer la demande"
        icon={send}
        onClick={onSubmit}
      />
    </IonPage>
  );
};

InitTask.propTypes = {
  match: PropTypes.object.isRequired // router match
};

export default InitTask;
