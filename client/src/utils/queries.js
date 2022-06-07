import { gql } from "@apollo/client";

const GET_ME = gql`
  query me {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      image
      link
      title
      description
    }
  }
`;

export { GET_ME };
