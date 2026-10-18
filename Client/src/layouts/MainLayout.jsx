import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../context/AuthContext';

const MainLayout = () => {
  return (
    <AuthProvider>
      <NavBar />
      <Outlet />
      <ToastContainer />
    </AuthProvider>
  );
};

export default MainLayout;
