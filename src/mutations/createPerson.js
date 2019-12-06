export default `

mutation CreatePerson($id: uuid!, $title: String!) {
  insert_persons(objects: {id: $id, title: $title}) {
    affected_rows
  }
}

`;
