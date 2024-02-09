import React, { useState, useEffect } from 'react';
import './ModelForm.css';

const ModelForm = () => {

  const [categories, setCategories] = useState([]);
  const [marques, setMarques] = useState([]);

  const fetchData = async () => {

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('https://cloud-back-voiture-production-3dbf.up.railway.app/modele/categorie', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${authToken}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Successful:', data.object);
        setCategories(data.object); // Assuming the response is an array of cars
      } else {
        console.log('Failed one:', data);
        console.error('Failed two:', response.status, response.statusText);
        // Handle login failure
      }
    } catch (error) {
      console.error('Error during calling:', error.message);
      // Handle other errors
    }

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('https://cloud-back-voiture-production-3dbf.up.railway.app/modele/marque', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${authToken}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Successful marque:', data.object);
        setMarques(data.object); // Assuming the response is an array of cars
      } else {
        console.log('Failed one marque:', data);
        console.error('Failed two marque:', response.status, response.statusText);
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

  const [formData, setFormData] = useState({
    nom: '',
    marque: '',
    categorie: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({
      idmarque: formData.marque.split(':')[0], 
      nommarque: formData.marque.split(':')[1], 
      id_categorie: formData.categorie.split(':')[0], 
      nomcategorie: formData.categorie.split(':')[1],
      nomModel: formData.nom
    }));
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('https://cloud-back-voiture-production-3dbf.up.railway.app/modele/modele', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          idmarque: formData.marque.split(':')[0], 
          nommarque: formData.marque.split(':')[1], 
          id_categorie: formData.categorie.split(':')[0], 
          nomcategorie: formData.categorie.split(':')[1],
          nomModele: formData.nom
        })
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Form submitted successfully:', responseData);
        // You can perform any additional actions after successful submission
      } else {
        console.log('Failed to submit form:', responseData);
      }
    } catch (error) {
      console.error('Error during form submission:', error.message);
    }
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
                <option value="">Marque</option>
                {marques.map(marque => (
                  <option key={marque._id} value={`${marque._id}:${marque.nom}`}>
                    {marque.nom}
                  </option>
                ))}

            </select>
        </div>

        <div className="form-group">
            <select
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                required
            >
                <option value="">Categorie</option>
                {categories.map(category => (
                  <option key={category._id} value={`${category._id}:${category.nom}`}>
                    {category.nom}
                  </option>
                ))}
                
                {/* Add more options as needed */}
            </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ModelForm;
