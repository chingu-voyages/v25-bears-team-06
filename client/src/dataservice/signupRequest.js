import baseRequest from "./baseRequest";

export default async function signupRequest({
  email,
  displayName,
  password,
  confirmPassword,
}) {
  const reqBody = {
    query: `
        mutation SignUp($email: String!, $displayName: String!, $password: String!, $confirmPassword: String!) {
          createAccount(
            email: $email,
            displayName: $displayName,
            password: $password,
            confirmPassword: $confirmPassword
          ) {
            userId
            token
            email
            displayName
          }
        }    
      `,
    variables: {
      email,
      displayName,
      password,
      confirmPassword,
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
