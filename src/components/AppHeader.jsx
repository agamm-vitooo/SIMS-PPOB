// AppHeader.js
import React, { useState } from 'react';
import logo from '../assets/logo/logo.png';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AppHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Link to="/" className='flex gap-2 items-center'> {/* Wrap the logo in a Link component to redirect to home */}
          <img src={logo} alt="Logo" className="h-6 w-6" />
          <span className="text-lg font-semibold text-gray-800">SIMS PPOB</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8">
        <Link to="/TopUpForm" className="text-gray-700 hover:text-gray-900">Top Up</Link>
        <Link to="/TransactionPages" className="text-gray-700 hover:text-gray-900">Transaction</Link>
        <Link to="/akun" className="text-gray-700 hover:text-gray-900">Akun</Link>
      </nav>

      {/* User Actions */}
      <div className="hidden md:block">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={toggleMobileMenu} className="md:hidden text-gray-700">
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <nav className="flex flex-col items-center space-y-4 p-4">
            <Link to="/TopUpForm" className="text-gray-700 hover:text-gray-900">Top Up</Link>
            <Link to="/TransactionPages" className="text-gray-700 hover:text-gray-900">Transaction</Link>
            <Link to="/akun" className="text-gray-700 hover:text-gray-900">Akun</Link>
            <div className="mt-4">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
