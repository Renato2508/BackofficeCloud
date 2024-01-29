// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import HomePage from './containers/home_page/HomePage';
import CarDetail from './components/car_detail/CarDetail';
import ModernForm from './components/modern_form/ModernForm';
import MarqueForm from './components/marque_form/MarqueForm';

const App = () => {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle authentication
  const handleAuthentication = () => {
    console.log("tonga ato")
    // Implement your authentication logic here
    setIsAuthenticated(true);
  };

  // PrivateRoute component for securing routes
  const PrivateRoute = ({ element }) => {
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
          element={<PrivateRoute element={<HomePage />} />}
        />
        <Route
          path="/CarDetail"
          element={<PrivateRoute element={<CarDetail />} />}
        />
        <Route
          path="/ModernForm"
          element={<PrivateRoute element={<ModernForm />} />}
        />
        <Route
          path="/MarqueForm"
          element={<PrivateRoute element={<MarqueForm />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
