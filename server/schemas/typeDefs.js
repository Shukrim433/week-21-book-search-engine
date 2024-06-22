const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String
    image: String
    link: String
    title: String!
   }

   type Query {
    me: User
   }

   type: Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
   }
`;

module.exports = typeDefs;

//  saveBook(bookData: BookInput!): User - returns the user record because each user has an array of savedBooks
//BookInput - bookId =  // saved book id from GoogleBooks


/*
- type
Usage: Defines the structure of objects that can be returned by the server or queried for.
Fields: Can contain other types, lists, and scalar values.
e.g. type Book {...}
e.g. usage:
  type Query {
  getBook(id: ID!): Book
  }
*/

/*
- input
Usage: Defines the structure of objects that can be passed as arguments to queries and mutations.
Fields: Can contain other input types, lists, and scalar values. Cannot contain type types.
e.g. input BookInput {...}
e.g. usage: 
  type Mutation {
  addBook(book: BookInput): Book
  }
*/

/*
Key Differences
Purpose: type is for data you fetch, input is for data you send.
Field Restrictions: input cannot have fields that are type.
*/