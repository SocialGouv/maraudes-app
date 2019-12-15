const getPerson = `query Person ($id: uuid!) {
  person: persons_by_pk(id: $id) {
    id
    updated_at
    created_at
    title
    todos {
      created_at
      completed_at
      expiration_at
      id
      title
      text
      created_user {
        username
        id
      }
    }
  }
}`;

export default getPerson;
