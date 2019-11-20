import React from "react";
import { useHistory } from "react-router-dom";

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

const CheckItem = ({
  checkboxProps = {},
  rightText = "",
  onClick = () => {},
  title = "",
  text = "",
  href = "",
  ...props
}) => {
  const history = useHistory();
  return (
    <IonItem {...props} onClick={onClick} lines="none">
      <IonCheckbox 
        slot="start"
        mode="ios"
        style={{
          alignSelf: "auto",
          marginTop: "1.5em",
        }}
        {...checkboxProps}
      />
      <IonLabel>
        <h3 slot="end" style={{ textAlign: "right" }}>
          {rightText || null}
        </h3>
        <h2>{title}</h2>
        <p className="ion-text-wrap">{text}</p>
      </IonLabel>
    </IonItem>
  );
};

export default CheckItem;
