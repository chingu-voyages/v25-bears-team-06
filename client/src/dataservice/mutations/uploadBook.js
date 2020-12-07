const uploadBookMutation = `
  mutation AddBook(
    $googleId: String!,
    $title: String!,
    $authors: String,
    $description: String,
    $categories: [String!],
    $pageCount: Int,
    $publishedDate: String,
    $publisher: String
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
`;

const uploadBookVariables = ({
  googleId,
  title,
  authors,
  description,
  categories,
  pageCount,
  publishedDate,
  publisher,
}) => ({
  googleId,
  title,
  authors,
  description,
  categories,
  pageCount,
  publishedDate,
  publisher,
});

const UPLOAD_BOOK = {
  mutation: uploadBookMutation,
  variables: uploadBookVariables,
};

export default UPLOAD_BOOK;
