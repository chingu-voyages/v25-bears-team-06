const checkoutBookMutation = `
  mutation CheckoutBook(
    $ownershipId: ID!,
    $checkoutDate: String!,
    $dueDate: String!
  ) {
    checkoutBook(
      ownershipId: $ownershipId,
      checkoutDate: $checkoutDate,
      dueDate: $dueDate
    ) {         
      _id
      owner {
        displayName
      }
      isAvailable
      checkoutData {
        user {
          displayName
          _id
        }
        checkoutDate
        dueDate
        returnDate
        condition
      }
      book {
        _id
      }
      waitlist {
        _id
      }
    }
  }
`;

const checkoutBookVariables = ({ ownershipId, checkoutDate, dueDate }) => ({
  ownershipId,
  checkoutDate,
  dueDate,
});

const CHECKOUT_BOOK = {
  mutation: checkoutBookMutation,
  variables: checkoutBookVariables,
};

export default CHECKOUT_BOOK;
