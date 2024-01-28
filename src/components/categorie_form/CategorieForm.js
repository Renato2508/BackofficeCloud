import React, { useState } from 'react';
import './CategorieForm.css';

const CategorieForm = () => {

  const [formData, setFormData] = useState({
    nom: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="modern-form-container">
      <form className="modern-form" onSubmit={handleSubmit}>
      <h2>Ajouter Categorie</h2>
        <div className="form-group">
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
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
