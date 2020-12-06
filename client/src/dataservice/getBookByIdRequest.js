import baseRequest from "./baseRequest";

export default async function getBookByIdRequest({ id }) {
  const reqBody = {
    query: `
      query Book($id: ID!) {
        getBookById(bookId: $id) {
          _id
          googleId
          title
          authors
          description
          categories
          pageCount
          publishedDate
          publisher
          owners {
            _id
            isAvailable
            owner {
              _id
              displayName
            } 
          }
        }
      }
    `,
    variables: {
      id,
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
