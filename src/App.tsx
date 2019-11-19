import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { contact, home, checkmarkCircleOutline } from "ionicons/icons";
import Tasks from "./pages/Tasks";
import Task from "./pages/Task";
import CreateTask from "./pages/CreateTask";
import InitTask from "./pages/InitTask";
import Home from "./pages/Home";
import Community from "./pages/Community";
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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tasks" component={Tasks} exact={true} />
          <Route path="/tasks/create/:id" component={InitTask} exact={true} />
          <Route path="/tasks/create" component={CreateTask} exact={true} />
          <Route path="/tasks/:id" component={Task} exact={true} />
          <Route path="/community/:id" component={Person} exact={true} />
          <Route path="/community" component={Community} exact={true} />
          <Route
            path="/"
            exact={true}
            render={() => <Redirect to="/tasks" />}
          />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          {/*<IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Accueil</IonLabel>
          </IonTabButton>*/}
          <IonTabButton tab="tasks" href="/tasks">
            <IonIcon icon={checkmarkCircleOutline} />
            <IonLabel>Demandes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="community" href="/community">
            <IonIcon icon={contact} />
            <IonLabel>Personnes</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
