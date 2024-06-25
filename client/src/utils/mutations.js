import { gql } from '@apollo/client';

// `LOGIN_USER` will execute the `loginUser` mutation set up using Apollo Server.
// login(email: String!, password: String!): Auth
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`
/*
$email: String!: This defines a variable named email of type String. The exclamation mark (!) means that this variable is required (it cannot be null).
$password: String!: This defines a variable named password of type String, and it is also required.
In the actual mutation, the defined variables are used:
login(email: $email, password: $password) {...}
*/


// `ADD_USER` will execute the `addUser` mutation.
// addUser(username: String!, email: String!, password: String!): Auth
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
  }
`

// `SAVE_BOOK` will execute the `saveBook` mutation.
// saveBook(bookData: BookInput!): User
export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
            _id
            username
            email
            bookCount
            savedBooks {
               bookId
                authors
                description
                image
                link
                title
            }
        }
    }
`

// `REMOVE_BOOK` will execute the `removeBook` mutation.
// removeBook(bookId: ID!): User
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
               bookId
                authors
                description
                image
                link
                title
            }
        }
    }
`