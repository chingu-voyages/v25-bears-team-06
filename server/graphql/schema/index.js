const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    password: String
    books: [Book!]
  }

  type Book {
    _id: ID!
    title: String!
    authors: [String!]!
    description: String!
    categories: [String!]
    imgThumbnail: String
    imgLarge: String
    pageCount: Int!
    publishedDate: String
    publisher: String
    ownedBy: [User!]!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    email: String!
  }

  type RootQuery {
    getAllBooks: [Book!]
  }

  type RootMutation {
    login(email: String!, password: String!): AuthData!
    register(email: String!, password: String!, confirmPassword: String!): AuthData!
    addBook: [Book!]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
