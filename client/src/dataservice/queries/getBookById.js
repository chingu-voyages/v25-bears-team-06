const getBookByIdQuery = `
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
`;

const getBookByIdVariables = ({ id }) => ({
  id,
});

const GET_BOOK_BY_ID = {
  mutation: getBookByIdQuery,
  variables: getBookByIdVariables,
};

export default GET_BOOK_BY_ID;
