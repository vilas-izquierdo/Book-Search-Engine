import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        usernam
      }
    }
  }
`;

const SAVE_BOOK = gql`
  mutation saveBook($input: savedBook!) {
    saveBook(input: $input) {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

export { LOGIN, ADD_USER, SAVE_BOOK, REMOVE_BOOK };
