import React, { useState } from "react";

import { useMutation } from "urql";
import format from "date-fns/format";
import { fr } from "date-fns/locale";

import uuidv4 from "uuid/v4";

import {
  IonItem,
  IonAvatar,
  IonIcon,
  IonButton,
  IonTextarea
} from "@ionic/react";

//import comments from "../comments.json";

import { text } from "ionicons/icons";

import AvatarItem from "../components/AvatarItem";
import GraphQLFetch from "../components/GraphQLFetch";

const frenchDate = date =>
  format(new Date(date), "d MMMM à HH'h'mm", { locale: fr });

const TextIcon = () => (
  <IonIcon
    icon={text}
    style={{ width: "100%", height: "60%", marginTop: "22%", fill: "white" }}
  />
);

// type AddCommentProps = {
//   onAddComment: any;
// };

const AddComment = ({ onAddComment, variables }) => {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("idle");
  const [, executeMutation] = useMutation(
    `
mutation PostMessage($id: uuid!, $todo_id: uuid, $person_id: uuid, $text: String!) {
  insert_messages(objects: {id: $id, todo_id: $todo_id, person_id: $person_id, text: $text}) {
    affected_rows
  }
}`
  );

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

const getTaskMessagesQuery = `query ($todo_id: uuid!) {
  todos_by_pk(id: $todo_id) {
    messages(order_by: {created_at: asc}) {
      id,
      text,
      created_user {
        username
      }
      created_at
    }
  }
}`;

const Comments = variables => {
  const query = variables.todo_id ? getTaskMessagesQuery : "";
  return (
    <GraphQLFetch
      query={query}
      variables={variables}
      render={({ result, refetch }) => {
        const comments =
          result &&
          result.data &&
          result.data.todos_by_pk &&
          result.data.todos_by_pk.messages;

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
