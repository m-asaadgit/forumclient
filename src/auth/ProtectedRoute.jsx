/* eslint-disable no-unused-vars */

import  { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        const response = await axios.get(`${apiUrl}/api/auth/checkauth`, 
          {
          headers: {
            Authorization: `Bearer ${token}` // Send the token with the request
          }
        }
      );

        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return <Loader></Loader>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
