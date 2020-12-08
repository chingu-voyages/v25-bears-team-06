const returnBookMutation = `
  mutation ReturnBook(
    $ownershipId: ID!,
    $returnDate: String!,
    $condition: String
  ) {
    returnBook(
      ownershipId: $ownershipId,
      returnDate: $returnDate,
      condition: $condition
    ) {
      _id
      isAvailable
      book {
        _id
      }
    }
  }
`;

const returnBookVariables = ({ ownershipId, returnDate, condition }) => ({
  ownershipId,
  returnDate,
  condition,
});

const RETURN_BOOK = {
  mutation: returnBookMutation,
  variables: returnBookVariables,
};

export default RETURN_BOOK;
