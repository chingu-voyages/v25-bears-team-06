const searchBooksQuery = `
  query SearchBooks($query: String) {
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
        waitlist {
          _id
        }
        isAvailable
        checkoutData {
          user {
            _id
          }
          returnDate
        }
      }
    }  
  }
`;

const searchBooksVariables = ({ query }) => ({
  query,
});

const SEARCH_BOOKS = {
  query: searchBooksQuery,
  variables: searchBooksVariables,
};

export default SEARCH_BOOKS;
