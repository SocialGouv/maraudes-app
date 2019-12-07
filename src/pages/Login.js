import React, { useState } from "react";
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
  IonPage
} from "@ionic/react";

import ButtonFooter from "../components/ButtonFooter";
import { setToken } from "../token";

const login = ({ username, password }) =>
  fetch("http://127.0.0.1:1337/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(res => res.json())
    .then(json => {
      if (json.error) {
        throw new Error(json.error);
      }
      return json;
    });

const LoginBox = () => {
  let loginInput;
  let passwordInput;
  const [status, setStatus] = useState("idle");
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(false);
  const onSubmit = () => {
    setStatus("submitting");
    login({
      username: loginInput.value,
      password: passwordInput.value
    })
      .then(r => {
        if (r.success) {
          setToken(r.user.token);
          history.push("/tasks");
          return;
        }
      })
      .catch(e => {
        setStatus("error");
        setShowMessage("Erreur: " + e.message);
        setTimeout(() => {
          setStatus("idle");
          setShowMessage(false);
        }, 2000);
      });
  };
  return (
    <div style={{ paddingTop: 100, width: 300, margin: "0 auto" }}>
      <div>
        <IonItem>
          <IonLabel>Email</IonLabel>
          <IonInput ref={node => (loginInput = node)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Mot de passe</IonLabel>
          <IonInput
            ref={node => (passwordInput = node)}
            type="password"
          ></IonInput>
        </IonItem>
      </div>
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        {showMessage}&nbsp;
      </div>
      <ButtonFooter
        style={{ marginTop: 50 }}
        disabled={status === "submitting"}
        text="se connecter"
        icon={send}
        onClick={onSubmit}
      />
    </div>
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
