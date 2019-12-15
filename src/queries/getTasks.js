const getTasks = `{
  todos {
    __typename
    id
    title
    expiration_at
    created_at
    created_user {
      username
    }
    completed_at
    completed_user {
      username
    }
    person {
      title
    }
    messages(order_by: {created_at: desc}) {
      id
    }
  }
}`;

export default getTasks;
