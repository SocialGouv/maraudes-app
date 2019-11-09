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
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonIcon icon={home} />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardSubtitle>Maraudes</IonCardSubtitle>
            <IonCardTitle>Maraudes</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Cum choris saltatricum adseclae cum et dudum respiratione
              tenerentur adseclae quidem simularunt cum formidatam praecipites
              indignitatis tenerentur et ut ita ob peregrini sine ne remanerent
              inopiam ad liberalium cum sine id haut saltatricum magistris
              interpellata formidatam ad tempus tria paucis.
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
