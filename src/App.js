import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { contact, checkmarkCircleOutline } from "ionicons/icons";

import {
  Provider,
  createClient,
  cacheExchange,
  dedupExchange,
  fetchExchange
} from "urql";

import { devtoolsExchange } from "@urql/devtools";

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
import Login from "./pages/Login";
import Task from "./pages/Task";
import CreateTask from "./pages/CreateTask";
import PickPerson from "./pages/PickPerson";
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
  exchanges: [dedupExchange, devtoolsExchange, cacheExchange, fetchExchange],
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
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route>
            <IonTabs>
              <IonRouterOutlet>
                <Route path="/tasks" component={Tasks} exact={true} />
                <Route
                  path="/tasks/create/:id"
                  component={CreateTask}
                  exact={true}
                />
                <Route
                  path="/tasks/create"
                  component={props => (
                    <PickPerson
                      title="Choisir le bénéficiaire"
                      destination="createTask"
                      {...props}
                    />
                  )}
                  exact={true}
                />
                <Route path="/tasks/:id" component={Task} exact={true} />
                <Route path="/persons/:id" component={Person} exact={true} />
                <Route
                  path="/persons"
                  component={props => (
                    <PickPerson
                      title="Personnes"
                      destination="createPerson"
                      {...props}
                    />
                  )}
                  exact={true}
                />
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
          </Route>
        </Switch>
      </IonReactRouter>
    </Provider>
    ;
  </IonApp>
);

export default App;
