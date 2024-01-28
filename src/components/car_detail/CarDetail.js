// CarDetail.js
import React from 'react';
import './CarDetail.css';

import carImage1 from '../../image/Car.jpg';

const car = {
  id: 1,
  make: 'Toyota',
  model: 'Camry',
  year: 2022,
  price: '$25,000',
  image: carImage1,
};

const CarDetail = () => {
  return (
    <div className="car-detail-car-details">
      <img src={car.image} alt={`${car.make} ${car.model}`} className="car-image-car-details" />
      <div className="car-details-car-details">
        <h2>{car.make} {car.model}</h2>
        <p className="detail-text-car-details"><strong>Year:</strong> {car.year}</p>
        <p className="detail-text-car-details"><strong>Price:</strong> {car.price}</p>
        <p className="detail-text-car-details"><strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat malesuada mi, at pulvinar nunc fermentum ut.</p>
        <div className="action-buttons-car-details">
          <button className="validate-button-car-details">Validate</button>
          <button className="refuse-button-car-details">Refuse</button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
