const getTask = `query Task($id: uuid!) {
  todo: todos_by_pk(id: $id) {
    id
    title
    text
    person{
      id
      title
    }
    created_user{
      id
      username
    }
    created_at
    completed_at
    completed_user{
      username
    }
    expiration_at
  }
}`;

export default getTask;
