export default `

query ($person_id: uuid!) {
  node: persons_by_pk(id: $person_id) {
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
