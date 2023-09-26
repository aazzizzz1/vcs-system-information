import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignInRoute = (props) => {
  if (Cookies.get('token') !== undefined) {
    return <Navigate to={'/'} />;
  } else {
    return props.children;
  }
};

export default SignInRoute;
