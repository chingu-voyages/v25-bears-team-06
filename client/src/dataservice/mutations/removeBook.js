const removeBookMutation = `
  mutation RemoveBook(
    $ownershipId: ID!
  ) {
    removeBook(
      ownershipId: $ownershipId
    )
  }
`;

const removeBookVariables = ({ ownershipId }) => ({ ownershipId });

const REMOVE_BOOK = {
  mutation: removeBookMutation,
  variables: removeBookVariables,
};

export default REMOVE_BOOK;
