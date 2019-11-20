import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonButton
} from "@ionic/react";

import { useHistory } from "react-router-dom";
import ButtonFooter from "../components/ButtonFooter";

import {
  home,
  book,
  build,
  colorFill,
  grid,
  clock,
  people,
  addCircle
} from "ionicons/icons";

import "./Home.css";

const Home: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent>
        <IonCard className="welcome-card">
          <div className="home-image" />
          <IonCardHeader>
            <IonCardSubtitle>Bienvenue</IonCardSubtitle>
            <IonCardTitle>Maraudes</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Cum choris saltatricum adseclae cum et dudum respiratione
              tenerentur adseclae quidem simularunt cum formidatam praecipites
              indignitatis tenerentur.
            </p>
          </IonCardContent>
        </IonCard>
        <IonList lines="none">
          <IonItem button onClick={() => history.push("/tasks")}>
            <IonIcon slot="start" color="medium" icon={clock} />
            <IonLabel>Demandes d'aide</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/persons")}>
            <IonIcon slot="start" color="medium" icon={people} />
            <IonLabel>Communauté</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <ButtonFooter
        text="nouvelle demande"
        onClick={() => history.push("/tasks/create")}
      />
    </IonPage>
  );
};

export default Home;
