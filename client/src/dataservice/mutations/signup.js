const signupMutation = `
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
`;

const signupVariables = ({
  email,
  displayName,
  password,
  confirmPassword,
}) => ({
  email,
  displayName,
  password,
  confirmPassword,
});

const SIGNUP = {
  mutation: signupMutation,
  variables: signupVariables,
};

export default SIGNUP;
