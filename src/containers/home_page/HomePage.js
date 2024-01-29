// HomePage.js
import React, { useEffect } from 'react';
import FeaturedCars from '../../components/featured_car/FeaturedCars';
import CarDetail from '../../components/car_detail/CarDetail';
import ModernForm from '../../components/modern_form/ModernForm';
import MarqueForm from '../../components/marque_form/MarqueForm';
import CategorieForm from '../../components/categorie_form/CategorieForm';
import ModelForm from '../../components/model_form/ModelForm';
import AdminProducts from '../../components/test_table/TestTable';
import StatCategorie from '../../components/stat_categorie/StatCategorie';
import Sidebar from '../../components/sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const type = location?.state?.type;

  // Set the current page type in local storage on component mount
  useEffect(() => {
    localStorage.setItem('currentPageType', type);
  }, [type]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '20.1%' }}>
        {type === 1 ? <FeaturedCars /> 
        : type === 2 ? <CarDetail /> 
        : type === 3 ? <ModernForm /> 
        : type === 4 ? <MarqueForm />
        : type === 5 ? <CategorieForm />
        : type === 6 ? <ModelForm />
        : type === 7 ? <AdminProducts />
        : type === 8 ? <StatCategorie />
        : null}
      </div>
    </div>
  );
};

export default HomePage;
