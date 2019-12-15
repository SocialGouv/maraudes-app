export default `

mutation PostMessage($id: uuid!, $todo_id: uuid, $person_id: uuid, $text: String!) {
  insert_messages(objects: {id: $id, todo_id: $todo_id, person_id: $person_id, text: $text}) {
    affected_rows
    returning {
      id
      __typename
    }
  }
}

`;
