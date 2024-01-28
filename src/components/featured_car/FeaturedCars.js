// FeaturedCars.js
import React, { useState } from 'react';
import './FeaturedCars.css';
import { useNavigate } from 'react-router-dom';

import carImage1 from '../../image/Car.jpg';

const FeaturedCars = () => {
  const navigate = useNavigate();

  const featuredCars = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      price: '$25,000',
      image: carImage1, // Use the imported image
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Accord',
      year: 2023,
      price: '$27,500',
      image: carImage1, // Use the imported image
    },
    {
      id: 3,
      make: 'Ford',
      model: 'Mustang',
      year: 2024,
      price: '$35,000',
      image: carImage1, // Use the imported image
    },
    {
      id: 4,
      make: 'Nissan',
      model: 'GTR',
      year: 2024,
      price: '$35,000',
      image: carImage1, // Use the imported image
    },
    {
      id: 5,
      make: 'Nissan',
      model: 'GTR',
      year: 2024,
      price: '$35,000',
      image: carImage1, // Use the imported image
    },
    // Add more featured cars as needed
  ];

  const carsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleSort = (sortOption) => {
    console.log(`Tri par : ${sortOption}`);
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
            <img src={car.image} alt={`${car.make} ${car.model}`} />
            <div className="car-details-featured-cars">
              <h3>{car.make} {car.model}</h3>
              <p>Année : {car.year}</p>
              <p>Prix : {car.price}</p>
              <a onClick={handleDetail}>Voir détail</a>
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
