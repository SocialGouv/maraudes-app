export default `

query Persons {
  persons(order_by: {title: asc}){
    id
    updated_at
    title
  }
}

`;
