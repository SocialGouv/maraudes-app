export default `

query PersonInfo($id: uuid!) {
  person: persons_by_pk(id: $id){
    id
    updated_at
    created_at
    title
  }
}

`;
