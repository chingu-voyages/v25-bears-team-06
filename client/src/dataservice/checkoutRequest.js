import baseRequest from "./baseRequest";

export default async function checkoutRequest({
  ownershipId,
  checkoutDate,
  dueDate,
}) {
  const reqBody = {
    query: `
      mutation Checkout($ownershipId: String!, $checkoutDate: String!, $dueDate: String!) {
        checkoutBook(ownershipId: ID!, checkoutDate: String!, dueDate: String!): Ownership! {         
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
    },
    body: JSON.stringify(reqBody),
  };

  return baseRequest(opts);
}
