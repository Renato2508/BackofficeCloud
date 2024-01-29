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
        <li><p onClick={handleListAnnonce}>List Annonce</p></li>
        <li><p onClick={handleAjouterComission}>Ajouter Comission</p></li>
        <li><p onClick={handleAjouterMarque}>Ajouter Marque</p></li>
        <li><p onClick={handleAjouterCategorie}>Ajouter Categorie</p></li>
        <li><p onClick={handleAjouterModel}>Ajouter Model</p></li>
        <li><p onClick={handleStatMarque}>Statistiques Marque</p></li>
        <li><p onClick={handleStatCategorie}>Statistiques Categorie</p></li>
        {/* Add more sidebar items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
