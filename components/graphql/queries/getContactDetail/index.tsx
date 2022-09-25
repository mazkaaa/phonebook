import { gql } from "@apollo/client";

const getContactDetail = gql`
query GetContactDetail($id: Int!){
  contact_by_pk(id: $id) {
    last_name
    id
    first_name
    created_at
    phones {
      number
    }
  }
}
`
export default getContactDetail;