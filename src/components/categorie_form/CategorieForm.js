import React, { useState } from 'react';
import './CategorieForm.css';

const CategorieForm = () => {

  const [nom, setNom] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('https://cloud-back-voiture-production-3dbf.up.railway.app/modele/categorie', {
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
      <h2>Ajouter Categorie</h2>
        <div className="form-group">
          <input
            type="text"
            name="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <label htmlFor="firstName">Nom Categorie</label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CategorieForm;
