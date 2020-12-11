const getInventoryQuery = `
  query Inventory {
    getInventory {
      _id
      book {
        _id
        googleId
        title
        authors
      }
      checkoutData {
        user {
          displayName
        }
        checkoutDate
        dueDate
        returnDate
        condition
      }
      isAvailable
    }
  }
`;

const GET_INVENTORY = {
  query: getInventoryQuery,
};

export default GET_INVENTORY;
