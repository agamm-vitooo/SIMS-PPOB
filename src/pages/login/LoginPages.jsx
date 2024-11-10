import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn redirectUrl="/home" />
    </div>
  );
};

export default Login;
