import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm';

const SIGN_IN_USER = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn = props => {
  useEffect(() => {
    document.title = 'Notedly - Sign In';
  });

  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGN_IN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      client.writeData({ data: { isLoggedIn: true } });
      const fromPathName = props.history.location.state;
      fromPathName
        ? props.history.push(fromPathName.from.pathname)
        : props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signin" />
      {loading && <p>Loading..</p>}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  );
};

export default SignIn;
