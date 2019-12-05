export default `

mutation CreateTask($id: uuid!, $person_id: uuid, $title: String!, $text: String!, $expiration_at: String) {
  insert_todos(objects: {id: $id, person_id: $person_id, title: $title, text: $text, expiration_at: $expiration_at}) {
    affected_rows
  }
}

`;
