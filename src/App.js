// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import HomePage from './containers/home_page/HomePage';
import CarDetail from './components/car_detail/CarDetail';
import ModernForm from './components/modern_form/ModernForm';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/CarDetail" element={<CarDetail />} />
        <Route path="/ModernForm" element={<ModernForm />} />
      </Routes>
    </Router>
  );
  
};

export default App;