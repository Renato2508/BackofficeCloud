// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import HomePage from './containers/home_page/HomePage';
import CarDetail from './components/car_detail/CarDetail';
import ModernForm from './components/modern_form/ModernForm';
import MarqueForm from './components/marque_form/MarqueForm';
import StatCategorie from './components/stat_categorie/StatCategorie';
import TestTable from './components/test_table/TestTable';

const App = () => {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated based on your logic (e.g., token presence)
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken);
  }, []);

  // Function to handle authentication
  const handleAuthentication = () => {
    // Implement your authentication logic here
    setIsAuthenticated(true);
  };

  // PrivateRoute component for securing routes
  const PrivateRoute = ({ element, path }) => {
    useEffect(() => {
      // Store the current page in localStorage when the route changes
      localStorage.setItem('currentPage', path);
    }, [path]);

    return isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage handleAuthentication={handleAuthentication} />}
        />
        {/* PrivateRoute is used for HomePage, CarDetail, and ModernForm */}
        <Route
          path="/HomePage"
          element={<PrivateRoute element={<HomePage />} path="/HomePage" />}
        />
        <Route
          path="/CarDetail"
          element={<PrivateRoute element={<CarDetail />} path="/CarDetail" />}
        />
        <Route
          path="/ModernForm"
          element={<PrivateRoute element={<ModernForm />} path="/ModernForm" />}
        />
        <Route
          path="/MarqueForm"
          element={<PrivateRoute element={<MarqueForm />} path="/MarqueForm" />}
        />
        <Route
          path="/StatCategorie"
          element={<PrivateRoute element={<StatCategorie />} path="/StatCategorie" />}
        />
        <Route
          path="/TestTable"
          element={<PrivateRoute element={<TestTable />} path="/TestTable" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
