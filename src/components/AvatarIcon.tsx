import React from "react";

import { IonAvatar, IonIcon } from "@ionic/react";

const AvatarIcon = ({ icon = {}, style = {} }) => (
  <IonAvatar style={{ background: "var(--ion-color-primary)", ...style }}>
    {icon && (
      <IonIcon
        icon={icon}
        style={{ width: "100%", height: "70%", marginTop: "15%" }}
      />
    )}
  </IonAvatar>
);

export default AvatarIcon;
