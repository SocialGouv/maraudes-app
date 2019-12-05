import React from "react";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonAvatar } from "@ionic/react";

const AvatarItem = ({
  avatarProps = {},
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
      <IonAvatar
        slot="start"
        style={{
          alignSelf: "baseline",
          marginTop: "1.5em",
          background: "var(--ion-color-primary)"
        }}
        {...avatarProps}
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

export default AvatarItem;
