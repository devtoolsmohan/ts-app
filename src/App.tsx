import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import EditPost from './components/EditPost';
import NewPost from './components/NewPost';


function App() {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
      <Router>
        <Switch>
        <ProtectedRoute
            path="/dashboard"
            component={Dashboard}
            isAuthenticated={isAuthenticated}
            redirectTo="/login"
        />
        <ProtectedRoute
            path="/posts/edit/:id"
            component={EditPost}
            isAuthenticated={isAuthenticated}
            redirectTo="/login"
        />
        <ProtectedRoute
            path="/posts/new"
            component={NewPost}
            isAuthenticated={isAuthenticated}
            redirectTo="/login"
        />
        <ProtectedRoute
            path="/login"
            component={Login}
            isAuthenticated={!isAuthenticated}
            redirectTo="/dashboard"
        />
        <ProtectedRoute
            path="/signup"
            component={Signup}
            isAuthenticated={!isAuthenticated}
            redirectTo="/dashboard"
        />
         <Redirect from="/" to="/dashboard" />
        </Switch>
      </Router>
  );
}

export default App;
