import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { useMutation } from "urql";
import uuidv4 from "uuid/v4";
import { send } from "ionicons/icons";
import createPersistedState from "use-persisted-state";

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

const useLoginState = createPersistedState("login");

const LoginBox = () => {
  const [login, setLogin] = useLoginState("");
  let password = "";
  const status = "";
  const onSubmit = () => {};
  return (
    <React.Fragment>
      <IonItem>
        <IonLabel>Login</IonLabel>
        <IonInput value={login}></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Mot de passe</IonLabel>
        <IonInput
          onKeyUp={e => (password = e.target.value)}
          type="password"
        ></IonInput>
      </IonItem>
      <ButtonFooter
        disabled={status === "submitting"}
        text="se connecter"
        icon={send}
        onClick={onSubmit}
      />
    </React.Fragment>
  );
};

const Login = ({ match }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connexion maraudes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <LoginBox />
      </IonContent>
    </IonPage>
  );
};

Login.propTypes = {
  match: PropTypes.object.isRequired // router match
};

export default Login;
