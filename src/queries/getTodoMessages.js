export default `

query ($todo_id: uuid!) {
  todo: todos_by_pk(id: $todo_id) {
    messages(order_by: {created_at: asc}) {
      id,
      text,
      created_user {
        username
      }
      created_at
    }
  }
}

`;
