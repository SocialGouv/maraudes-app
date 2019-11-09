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
  IonToolbar
} from "@ionic/react";

import { useHistory } from "react-router-dom";

import {
  home,
  book,
  build,
  colorFill,
  grid,
  clock,
  people
} from "ionicons/icons";

import "./Home.css";

const Home: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent>
        <IonCard className="welcome-card">
          <img src="/assets/glenn-carstens-peters-rTO4hjAgbDU-unsplash.jpg" />
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
            <IonLabel>Tâches</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/community")}>
            <IonIcon slot="start" color="medium" icon={people} />
            <IonLabel>Communauté</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
