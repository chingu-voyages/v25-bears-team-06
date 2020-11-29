import baseRequest from "./baseRequest";

export default async function uploadBookRequest({
  googleId,
  title,
  authors,
  description,
  categories,
  pageCount,
  publishedDate,
  publisher,
}) {
  const reqBody = {
    query: `
    mutation addBook(bookInput: {
    googleId: String!
    title: String!
    authors: [String!]
    description: String!
    categories: [String!]
    pageCount: Int!
    publishedDate: String!
    publisher: String!
  })
    `,
    variables: {
      googleId,
      title,
      authors,
      description,
      categories,
      pageCount,
      publishedDate,
      publisher,
    },
  };

  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  };

  return baseRequest(opts);
}
