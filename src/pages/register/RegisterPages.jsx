import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp redirectUrl="/home" />
    </div>
  );
};

export default Register;
