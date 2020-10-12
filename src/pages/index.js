// import dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

// import shared layout
import Layout from '../components/Layout';

// import routes
import Home from './home';
import Favorites from './favorites';
import MyNotes from './mynotes';
import NotePage from './note';
import Signup from './signup';
import SignIn from './signin';
import NewNote from './new';
import EditNote from './edit';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/mynotes" component={MyNotes} />
        <PrivateRoute path="/favorites" component={Favorites} />
        <PrivateRoute path="/new" component={NewNote} />
        <PrivateRoute path="/edit/:id" component={EditNote} />
        <Route path="/note/:id" component={NotePage} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={SignIn} />
      </Layout>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;
  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default Pages;
