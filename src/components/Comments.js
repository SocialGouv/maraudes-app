import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "urql";
import format from "date-fns/format";
import { fr } from "date-fns/locale";
import uuidv4 from "uuid/v4";
import { text } from "ionicons/icons";
import {
  IonItem,
  IonAvatar,
  IonIcon,
  IonButton,
  IonTextarea
} from "@ionic/react";

import AvatarItem from "../components/AvatarItem";
import GraphQLFetch from "../components/GraphQLFetch";
import getTaskMessages from "../queries/getTaskMessages";
import postMessage from "../mutations/postMessage";

const frenchDate = date =>
  format(new Date(date), "d MMMM à HH'h'mm", { locale: fr });

const TextIcon = () => (
  <IonIcon
    icon={text}
    style={{ width: "100%", height: "60%", marginTop: "22%", fill: "white" }}
  />
);

const AddComment = ({ onAddComment, variables = {} }) => {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("idle");
  const [, executeMutation] = useMutation(postMessage);

  const onSubmit = () => {
    setStatus("submitting");
    executeMutation({
      text: value,
      id: uuidv4(),
      ...variables
    })
      .then(result => {
        if (result.error) {
          alert("Impossible d'envoyer le message :/");
          throw result.error;
        }
        setStatus("idle");
        setValue("");
        onAddComment();
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <IonItem style={{ marginTop: 20 }} lines="none">
      <IonAvatar
        slot="start"
        style={{
          alignSelf: "baseline",
          background: "var(--ion-color-success)"
        }}
      >
        <TextIcon />
      </IonAvatar>
      <IonTextarea
        onKeyUp={e => setValue(e.target.value)}
        value={value}
        class="comment"
        style={{ fontSize: "0.9em", height: 100 }}
        placeholder="Ajouter un message"
      />
      <IonButton
        disabled={status === "submitting"}
        color="primary"
        onClick={onSubmit}
      >
        Envoyer
      </IonButton>
    </IonItem>
  );
};

AddComment.propTypes = {
  onAddComment: PropTypes.func.isRequired,
  variables: PropTypes.object
};

const Comments = variables => {
  const query = variables.todo_id ? getTaskMessages : "";
  return (
    <GraphQLFetch
      query={query}
      variables={variables}
      render={({ result, refetch }) => {
        const comments =
          result &&
          result.data &&
          result.data.todo &&
          result.data.todo.messages;
        return (
          <React.Fragment>
            {comments &&
              comments.map(comment => (
                <AvatarItem
                  key={comment.id}
                  rightText={frenchDate(comment.created_at)}
                  title={comment.created_user.username}
                  text={comment.text}
                  avatarProps={{
                    children: <TextIcon />
                  }}
                />
              ))}
            <AddComment onAddComment={refetch} variables={variables} />
          </React.Fragment>
        );
      }}
    />
  );
};

export default Comments;
