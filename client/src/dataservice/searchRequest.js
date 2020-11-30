import baseRequest from "./baseRequest";

export default async function searchBooks({ query }) {
  const reqBody = {
    query: `
      query SearchBooks($query: String!) {
        books(
          query: $query
        ) {
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
            owner {
              _id
              displayName
              location {
                country
                city
                latitude
                longitude
              }
            }
            isAvailable
          }
        }  
      }
    `,
    variables: {
      query,
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
