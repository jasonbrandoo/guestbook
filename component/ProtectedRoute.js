import React from 'react';
import Router, { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import Login from '../pages/login';

const ProtectedRoute = ({ children }) => {
  const [loggedIn, loading] = useAuth();
  const { pathname } = useRouter();

  React.useEffect(() => {
    if (!loggedIn) Router.replace('/login', pathname);
  }, [loggedIn, pathname]);

  return children;
};

export default ProtectedRoute;
