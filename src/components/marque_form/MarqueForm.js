import React, { useState } from 'react';
import './MarqueForm.css';

const MarqueForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    fichier: '',
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, fichier: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez votre logique de soumission de formulaire ici
    console.log('Form submitted:', formData);
  };

  return (
    <div className="modern-form-container">
      <form className="modern-form" onSubmit={handleSubmit}>
        <h2>Ajouter Marque</h2>

        <div className="form-group">
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            required
          />
          <label htmlFor="firstName">Nom Marque</label>
        </div>

        <div className="form-group file-input">
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
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MarqueForm;
