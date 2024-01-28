import React, { useState } from 'react';
import './ModelForm.css';

const ModelForm = () => {

  const [formData, setFormData] = useState({
    nom: '',
    marque: '',
    categorie: '',
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
      <h2>Ajouter Model</h2>

        <div className="form-group">
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          <label htmlFor="firstName">Nom Model</label>
        </div>

        <div className="form-group">
            <select
                name="marque"
                value={formData.marque}
                onChange={handleChange}
                required
            >
                <option value="">Select Marque</option>
                <option value="Marque1">Marque 1</option>
                <option value="Marque2">Marque 2</option>
                {/* Add more options as needed */}
            </select>
        </div>

        <div className="form-group">
            <select
                name="categorie"
                value={formData.marque}
                onChange={handleChange}
                required
            >
                <option value="">Select categorie</option>
                <option value="Marque1">categorie 1</option>
                <option value="Marque2">categorie 2</option>
                {/* Add more options as needed */}
            </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ModelForm;
