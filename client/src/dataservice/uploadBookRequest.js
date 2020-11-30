import baseRequest from "./baseRequest";

export default async function uploadBookRequest(
  {
    googleId,
    title,
    authors,
    description,
    categories,
    pageCount,
    publishedDate,
    publisher,
  },
  token,
) {
  const reqBody = {
    query: `
    mutation AddBook(
      $googleId: String!,
      $title: String!,
      $authors: String,
      $description: String!,
      $categories: [String!],
      $pageCount: Int!,
      $publishedDate: String!,
      $publisher: String!
    ) {
      addBook(bookInput: {
        googleId: $googleId,
        title: $title,
        authors: $authors,
        description: $description,
        categories: $categories,
        pageCount: $pageCount,
        publishedDate: $publishedDate,
        publisher:  $publisher
      }) {
        _id
      }
    }
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
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqBody),
  };

  return baseRequest(opts);
}
