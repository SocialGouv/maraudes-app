import React from "react";
import { IonIcon, IonToolbar, IonFooter, IonButton } from "@ionic/react";
import { addCircle } from "ionicons/icons";

import { useHistory } from "react-router-dom";

const ButtonFooter = ({
  text = "",
  color = "primary",
  icon = addCircle,
  onClick = () => {}
}) => {
  const history = useHistory();
  return (
    <IonFooter>
      <IonToolbar className="ion-text-center">
        <IonButton color={color} onClick={onClick}>
          {icon && (
            <IonIcon
              icon={icon}
              style={{ marginRight: "5px", verticalAlign: "middle" }}
            />
          )}
          {text}
        </IonButton>
      </IonToolbar>
    </IonFooter>
  );
};

export default ButtonFooter;
