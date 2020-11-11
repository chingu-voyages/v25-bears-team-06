const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Book {
    _id: ID!
    title: String!
    authors: [String!]!
    imageThumbnail: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    email: String!
  }

  type RootQuery {
    books: [Book!]
    login(email: String!, password: String!): AuthData!
  }

  schema {
    query: RootQuery
  }
`);
