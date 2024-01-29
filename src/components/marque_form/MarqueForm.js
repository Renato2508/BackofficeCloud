import React, { useState } from 'react';
import './MarqueForm.css';

const MarqueForm = () => {
  const [nom, setNom] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(JSON.stringify({ nom }))

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('https://cloud-back-voiture-production.up.railway.app/modele/marque', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ nom }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('successful:', data);
        localStorage.setItem('authToken',data.object.token);
        console.log('local storage : '+localStorage.getItem('authToken'));
        // Perform any actions upon successful login
      } else {
        console.log('failed:', data)
        console.error('error failed:', response.status, response.statusText);
        // Handle login failure
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle other errors
    }

  };

  return (
    <div className="modern-form-container">
      <form className="modern-form" onSubmit={handleSubmit}>
        <h2>Ajouter Marque</h2>

        <div className="form-group">
          <input
            type="text"
            name="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <label htmlFor="firstName">Nom Marque</label>
        </div>

        {/* <div className="form-group file-input">
          <label htmlFor="fileInput" className="file-label">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="#fffffff" stroke-width="2"></path>
              <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#fffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            ADD FILE 
            <input
              type="file"
              name="fichier"
              id="fileInput"
              onChange={handleFileChange}
              required
            />
          </label>
        </div> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MarqueForm;
