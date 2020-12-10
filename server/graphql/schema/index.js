const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    displayName: String!
    password: String
    location: Location
    owns: [Ownership!]
    checkedOut: [Ownership!]
    waitlisted: [Ownership!]
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
    authors: String
    description: String
    categories: [String!]
    pageCount: Int
    publishedDate: String
    publisher: String
    owners: [Ownership!]!
  }

  type Ownership {
    _id: ID!
    owner: User!
    book: Book!
    isAvailable: Boolean!
    checkoutData: [Checkout!]
    waitlist: [User!]
  }

  type Checkout {
    user: User!
    checkoutDate: String!
    dueDate: String!
    returnDate: String
    condition: String
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
    authors: String
    description: String
    categories: [String!]
    pageCount: Int
    publishedDate: String
    publisher: String
  }

  type RootQuery {
    books(query: String): [Book!]
    getInventory: [Ownership!]
    getBookById(bookId: ID!): Book!
    getUser: User!
  }

  type RootMutation {
    login(email: String!, password: String!): AuthData!
    createAccount(email: String!, displayName: String!, password: String!, confirmPassword: String!): AuthData!
    addBook(bookInput: BookInput!): Book!
    checkoutBook(ownershipId: ID!, checkoutDate: String!, dueDate: String!): Ownership!
    returnBook(ownershipId: ID!, returnDate: String!, condition: String): Ownership!
    removeBook(ownershipId: ID!): Boolean!
    joinWaitlist(ownershipId: ID!): Ownership!
    leaveWaitlist(ownershipId: ID!): Ownership!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
