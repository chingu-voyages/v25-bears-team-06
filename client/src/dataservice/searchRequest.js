import baseRequest from "./baseRequest";

export default async function searchBooks() {
  const reqBody = {
    query: `
      query books($query: String!) {
        books(query:$query) {
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
      //
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
