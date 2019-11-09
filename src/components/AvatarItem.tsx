import React from "react";

import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonRadio,
  IonCheckbox,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonListHeader,
  IonContent,
  IonAvatar,
  IonFooter,
  IonHeader,
  IonIcon,
  IonButton,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonTextarea,
  IonRow
} from "@ionic/react";

const AvatarItem = ({
  avatarStyle = {},
  rightText = "",
  onClick = () => {},
  title = "",
  text = "",
  ...props
}) => (
  <IonItem {...props}>
    <IonAvatar
      slot="start"
      style={{
        alignSelf: "end",
        marginTop: "1.5em",
        background: "#3880ff",
        ...avatarStyle
      }}
    />
    <IonLabel>
      <h3 slot="end" style={{ textAlign: "right" }}>
        {rightText}
      </h3>
      <h2>{title}</h2>
      <p className="ion-text-wrap">{text}</p>
    </IonLabel>
  </IonItem>
);

export default AvatarItem;
