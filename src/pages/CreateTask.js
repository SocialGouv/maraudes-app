import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { useMutation } from "urql";
import { Redirect } from "react-router-dom";
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
import getPerson from "../queries/getPerson";
import createTask from "../mutations/createTask";
import getUserId from "../getUserId";

const InitTask = ({ match }) => {
  const personId = match.params.id;

  const currentUserId = getUserId();

  // in one hour
  const expiration = new Date(new Date().getTime() + 60 * 60 * 1000);

  const [values, setValues] = useState({
    date: expiration.toISOString().slice(0, 10),
    time: expiration.toLocaleTimeString().slice(0, 5)
  });

  const [status, setStatus] = useState("idle");
  const [, executeMutation] = useMutation(createTask);
  const history = useHistory();

  const onSubmit = () => {
    if (!values.title || !values.text) {
      alert("Vous devez remplir tous les champs");
      return;
    }
    const uuid = uuidv4();
    setStatus("submitting");
    const utcDate = new Date(values.date);
    utcDate.setHours(values.time.split(":")[0]);
    utcDate.setMinutes(values.time.split(":")[1]);
    const submitValues = {
      id: uuid,
      person_id: personId,
      title: values.title,
      text: values.text,
      expiration_at: utcDate.toISOString()
    };
    executeMutation(submitValues)
      .then(result => {
        if (result.error) {
          alert("Impossible d'envoyer la demande :/");
          throw result.error;
        }
        setStatus("success");
        history.replace(`/tasks/${uuid}`);
      })
      .catch(() => {
        setStatus("error");
      });
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
          <IonTitle>Nouvelle demande</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GraphQLFetch
          query={getPerson}
          variables={{ id: personId }}
          render={({ data }) => {
            const person = data && data.person;
            return (
              <React.Fragment>
                <h2 style={{ paddingLeft: 10 }}>Demande pour {person.title}</h2>
                <IonItem>
                  <IonLabel position="stacked">Titre de la demande *</IonLabel>
                  <IonInput
                    onKeyUp={e =>
                      setValues({ ...values, title: e.target.value })
                    }
                    value={values.title}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Date d&apos;échéance</IonLabel>
                  <div style={{ width: "100%" }}>
                    <IonInput
                      style={{
                        width: 200,
                        display: "inline-block"
                      }}
                      onBlur={e =>
                        console.log(e.target.value) ||
                        setValues({ ...values, date: e.target.value })
                      }
                      type="date"
                      value={values.date}
                    ></IonInput>
                    <IonInput
                      style={{
                        width: 200,
                        display: "inline-block"
                      }}
                      onBlur={e =>
                        setValues({ ...values, time: e.target.value })
                      }
                      type="time"
                      value={values.time}
                    ></IonInput>
                  </div>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Description *</IonLabel>
                  <IonTextarea
                    onKeyUp={e =>
                      setValues({ ...values, text: e.target.value })
                    }
                    rows={10}
                    value={values.text}
                  ></IonTextarea>
                </IonItem>
              </React.Fragment>
            );
          }}
        />
      </IonContent>
      <ButtonFooter
        disabled={status === "submitting"}
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
