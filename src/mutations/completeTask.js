export default `

mutation CompleteTask($id: uuid!, $completed_at: timestamptz, $completed_by: uuid) {
  update_todos(where: {id: {_eq: $id} }, _set: {completed_at: $completed_at, completed_by: $completed_by}) {
    returning {
      id
      __typename
    }
  }
}

`;
