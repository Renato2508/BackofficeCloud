// FeaturedCars.js
import React, { useState, useEffect } from 'react';
import './FeaturedCars.css';
import { useNavigate } from 'react-router-dom';

const FeaturedCars = () => {
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState([]);

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

  const handleValidate = async (carId) => {
    console.log("id : "+carId);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('https://cloud-back-voiture-production.up.railway.app/annonce/valide?idannonce='+carId, {
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
        {featuredCars.map((car) => (
          <div className="car-featured-cars" key={car.idannonce}>
            <img src={car.voiture.images[0]} alt={car.voiture.modele.nom}/>
            <div className="car-details-featured-cars">
              <h3>{car.voiture.modele.marque.nom} {car.voiture.modele.nom}</h3>
              <p>{car.voiture.modele.categorie.nom}</p>
              <p>Année : {car.voiture.anneesortie}</p>
              <p>Prix : {car.voiture.commission} Ar</p>
              <p onClick={handleDetail}>Voir détail</p>
              <div className="action-buttons-featured-cars">
                <button onClick={() => handleValidate(car.idannonce)} className="validate-button-featured-cars">
                  Valider
                </button>
                <button onClick={() => handleRefuse(car.idannonce)} className="refuse-button-featured-cars">
                  Refuser
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars;
