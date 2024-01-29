// FeaturedCars.js
import React, { useState, useEffect } from 'react';
import './FeaturedCars.css';
import { useNavigate } from 'react-router-dom';

import carImage1 from '../../image/Car.jpg';

const FeaturedCars = () => {
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 2;

  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('https://cloud-back-voiture-production.up.railway.app/annonce/notvalide', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${authToken}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Successful:', data);
        setFeaturedCars(data.object); // Assuming the response is an array of cars
      } else {
        console.log('Failed one:', data);
        console.error('Failed two:', response.status, response.statusText);
        // Handle login failure
      }
    } catch (error) {
      console.error('Error during calling:', error.message);
      // Handle other errors
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = featuredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(featuredCars.length / carsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleValidate = (carId) => {
    console.log(`Car ${carId} Validated`);
  };

  const handleRefuse = (carId) => {
    console.log(`Car ${carId} Refused`);
  };

  const handleDetail = () => {
    console.log('Voir détail');
    navigate('/HomePage', { state: { type: 2 } });
  };

  return (
    <div className="featured-car-featured-cars">
      <div className="intro-section-featured-cars">
        <h2>Featured Cars</h2>
      </div>
      <div className="car-list-featured-cars">
        {currentCars.map((car) => (
          <div className="car-featured-cars" key={car.id}>
            <img src={carImage1} alt={`${car.make} ${car.model}`} />
            <div className="car-details-featured-cars">
              <h3>{car.make} {car.model}</h3>
              <p>Année : {car.year}</p>
              <p>Prix : {car.price}</p>
              <p onClick={handleDetail}>Voir détail</p>
              <div className="action-buttons-featured-cars">
                <button onClick={() => handleValidate(car.id)} className="validate-button-featured-cars">
                  Valider
                </button>
                <button onClick={() => handleRefuse(car.id)} className="refuse-button-featured-cars">
                  Refuser
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-featured-cars">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active-featured-cars' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars;
