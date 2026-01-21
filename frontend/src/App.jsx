import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Registation from './components/Auth/Registation';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './context/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import { AuthContext } from './context/AuthProvider';

const App = () => {
  const navigate = useNavigate();
  const { isAuth, loading } = useContext(AuthContext);
  useEffect(() => {
    if (!loading && isAuth.isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuth, loading, navigate]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Registation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;
