// Sidebar.js
import React from 'react';
import './Sidebar.css'; // You can create a separate CSS file for styling
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate(); 

  const handleListAnnonce = async (e) => {
    e.preventDefault();
    navigate('/HomePage', { state: { type: 1 } });
  }

  const handleAjouterComission = async (e) => {
    e.preventDefault();

    navigate('/HomePage', { state: { type: 3 } });
  }

  const handleAjouterMarque = async (e) => {
    e.preventDefault();

    navigate('/HomePage', { state: { type: 4 } });
  }

  const handleAjouterCategorie = async (e) => {
    e.preventDefault();

    navigate('/HomePage', { state: { type: 5 } });
  }

  const handleAjouterModel = async (e) => {
    e.preventDefault();

    navigate('/HomePage', { state: { type: 6 } });
  }

  const handleStatMarque = async (e) => {
    e.preventDefault();

    navigate('/HomePage', { state: { type: 7 } });
  }

  const handleStatCategorie = async (e) => {
    e.preventDefault();

    navigate('/HomePage', { state: { type: 8 } });
  }

  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><a onClick={handleListAnnonce}>List Annonce</a></li>
        <li><a onClick={handleAjouterComission}>Ajouter Comission</a></li>
        <li><a onClick={handleAjouterMarque}>Ajouter Marque</a></li>
        <li><a onClick={handleAjouterCategorie}>Ajouter Categorie</a></li>
        <li><a onClick={handleAjouterModel}>Ajouter Model</a></li>
        <li><a onClick={handleStatMarque}>Statistiques Marque</a></li>
        <li><a onClick={handleStatCategorie}>Statistiques Categorie</a></li>
        {/* Add more sidebar items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
