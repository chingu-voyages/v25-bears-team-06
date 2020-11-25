const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    displayName: String!
    password: String
    owns: [Ownership!]
    location: Location
  }

  type Location {
    country: String
    city: String
    latitude: Float
    longitude: Float
  }

  type Book {
    _id: ID!
    googleId: String!
    title: String!
    authors: [String!]
    description: String!
    categories: [String!]
    pageCount: Int!
    publishedDate: String!
    publisher: String!
    owners: [Ownership!]!
  }

  type Ownership {
    _id: ID!
    owner: User!
    book: Book!
    isAvailable: Boolean!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    email: String!
    displayName: String!
  }

  input BookInput {
    googleId: String!
    title: String!
    authors: [String!]
    description: String!
    categories: [String!]
    pageCount: Int!
    publishedDate: String!
    publisher: String!
  }

  type RootQuery {
    books(query: String): [Book!]
    getInventory: [Ownership!]
    getBookById(bookId: ID!): Book!
  }

  type RootMutation {
    login(email: String!, password: String!): AuthData!
    createAccount(email: String!, displayName: String!, password: String!, confirmPassword: String!): AuthData!
    addBook(bookInput: BookInput!): Book!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
