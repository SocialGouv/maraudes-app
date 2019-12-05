import React from "react";
import { useHistory } from "react-router-dom";

import { IonItem, IonLabel, IonCheckbox } from "@ionic/react";

const CheckItem = ({
  labelProps = {},
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
    <IonItem {...props} lines="none">
      <IonCheckbox
        slot="start"
        mode="ios"
        style={{
          alignSelf: "auto",
          marginTop: "1.5em"
        }}
        {...checkboxProps}
      />
      <IonLabel onClick={onClick}>
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
