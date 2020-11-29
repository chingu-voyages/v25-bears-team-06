import baseRequest from "./baseRequest";

export default async function searchBooks(title, authors) {
  const reqBody = {
    query: `
      query SearchBooks($query: String!) {
        books {
          _id
        googleId
        title
        authors
        description
        categories
        pageCount
        publishedDate
        publisher
        }  
      }
    `,
    variables: {
      title,
      authors,
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
