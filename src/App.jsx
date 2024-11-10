// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/HomePages';
import Register from './pages/register/RegisterPages';
import Login from './pages/login/LoginPages';
import TopUpForm from './pages/TopupPages';
import TransactionPages from './pages/TransactionPages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/TopUpForm" element={<TopUpForm />} />
        <Route path="/TransactionPages" element={<TransactionPages />} />
      </Routes>
    </Router>
  );
}

export default App;
