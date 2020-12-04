import baseRequest from "./baseRequest";

export default async function checkoutRequest(
  { ownershipId, checkoutDate, dueDate },
  token,
) {
  const reqBody = {
    query: `
      mutation CheckoutBook(
      $ownershipId: ID!,
      $checkoutDate: String!,
      $dueDate: String!
    ) {
        checkoutBook(
          ownershipId: $owner._id,
          checkoutDate: $checkoutDate,
          dueDate: $dueDate
          ) {         
          ownershipId
          checkoutDate
          dueDate
        }
      }
    `,
    variables: {
      ownershipId,
      checkoutDate,
      dueDate,
    },
  };

  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqBody),
  };

  return baseRequest(opts);
}
