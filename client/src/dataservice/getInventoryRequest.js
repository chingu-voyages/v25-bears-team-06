import baseRequest from "./baseRequest";

export default async function getInventoryRequest({ token }) {
  const reqBody = {
    query: `
      query Inventory {
        getInventory {
          _id
          book {
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
              checkoutData {
                user {
                  displayName
                }
                checkoutDate
                dueDate
                returnDate
                condition
              }
            }
          }
          isAvailable
        }
      }
    `,
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
