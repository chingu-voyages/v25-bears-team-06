const loginMutation = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      email
      displayName
    }
  }
`;

const loginVariables = ({ email, password }) => ({
  email,
  password,
});

const LOGIN = {
  mutation: loginMutation,
  variables: loginVariables,
};

export default LOGIN;
