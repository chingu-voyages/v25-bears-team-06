import baseRequest from "./baseRequest";

export default async function loginRequest({ email, password }) {
  const reqBody = {
    query: `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          userId
          token
          email
          displayName
        }
      }
    `,
    variables: {
      email,
      password,
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
