import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { contact, checkmarkCircleOutline } from "ionicons/icons";
import { Provider, createClient } from "urql";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";

import Tasks from "./pages/Tasks";
import Task from "./pages/Task";
import CreateTask from "./pages/CreateTask";
import InitTask from "./pages/InitTask";
import Persons from "./pages/Persons";
import Person from "./pages/Person";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme.css";

import { getToken } from "./token";

const client = createClient({
  url: "http://127.0.0.1:8088/v1/graphql",
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" }
    };
  }
});

const App = () => (
  <IonApp>
    <Provider value={client}>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/tasks" component={Tasks} exact={true} />
            <Route path="/tasks/create/:id" component={InitTask} exact={true} />
            <Route path="/tasks/create" component={CreateTask} exact={true} />
            <Route path="/tasks/:id" component={Task} exact={true} />
            <Route path="/persons/:id" component={Person} exact={true} />
            <Route path="/persons" component={Persons} exact={true} />
            <Route
              path="/"
              exact={true}
              render={() => <Redirect to="/tasks" />}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tasks" href="/tasks">
              <IonIcon icon={checkmarkCircleOutline} />
              <IonLabel>Demandes</IonLabel>
            </IonTabButton>
            <IonTabButton tab="persons" href="/persons">
              <IonIcon icon={contact} />
              <IonLabel>Personnes</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </Provider>
    ;
  </IonApp>
);

export default App;
