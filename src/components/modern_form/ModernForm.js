import React, { useState } from 'react';
import './ModernForm.css';

const ModernForm = () => {

  const [pourcentage, setPourcentage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(JSON.stringify({ pourcentage }))

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('https://cloud-back-voiture-production-3dbf.up.railway.app/detail/commission', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ pourcentage }),
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
      <h2>Ajouter Comission</h2>
        <div className="form-group">
          <input
            type="text"
            name="nom"
            value={pourcentage}
            onChange={(e) => setPourcentage(e.target.value)}
            required
          />
          <label htmlFor="firstName">Nom Commision</label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ModernForm;
