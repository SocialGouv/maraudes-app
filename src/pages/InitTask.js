import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
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

const InitTask = ({ match }) => {
  const history = useHistory();
  const id = match.params.id;

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
                  <IonInput></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Date d&apos;échéance</IonLabel>
                  <IonInput type="date" value="2019-11-01"></IonInput>
                  <IonInput type="time" value="09:00"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Description *</IonLabel>
                  <IonTextarea rows={10}></IonTextarea>
                </IonItem>
              </React.Fragment>
            );
          }}
        />
      </IonContent>
      <ButtonFooter
        text="enregistrer la demande"
        icon={send}
        onClick={() => history.replace("/tasks/1")}
      />
    </IonPage>
  );
};

InitTask.propTypes = {
  match: PropTypes.object.isRequired // router match
};

export default InitTask;
