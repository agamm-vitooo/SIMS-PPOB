import React from 'react';
import { useUser } from '@clerk/clerk-react';

const WelcomeSection = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="text-gray-700">
        <h1 className="text-3xl font-medium">Selamat datang👋</h1>
        <h2 className="text-4xl font-bold">{user?.fullName || 'User'}</h2>
      </div>
    </div>
  );
};

export default WelcomeSection;
