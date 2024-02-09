import React, { useState, useEffect, useCallback } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

import './StatCategorie.css'; // Import the custom CSS file

const StatCategorie = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm2, setSearchTerm2] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [categories, setCategories] = useState([]);
  let id = 0;

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
        setCategories(data.object);
      } else {
        console.log('Failed one:', data);
        console.error('Failed two:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during calling:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchProductsByCategory = useCallback(async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('https://cloud-back-voiture-production-3dbf.up.railway.app/stats/statsCategorie', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ categorie: searchTerm2 })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Successful products fetch by category:', data.object);
        setFilteredProducts(data.object);
      } else {
        console.log('Failed products fetch by category:', data);
        console.error('Failed products fetch by category:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during product fetching by category:', error.message);
    }
  }, [searchTerm2]);

  useEffect(() => {
    if (searchTerm2) {
      fetchProductsByCategory();
    }
  }, [searchTerm2, fetchProductsByCategory]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5-test-table">
      <div className="mb-3-test-table">
        <Form.Select
          className="ml-2-test-table"
          onChange={(e) => setSearchTerm2(e.target.value)}
          value={searchTerm2}
        >
          <option value="">Categorie</option>
          {categories.map(category => (
            <option key={category._id} value={category.nom}>
              {category.nom}
            </option>
          ))}
        </Form.Select>
      </div>
      <table className="table table-bordered-test-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Categorie</th>
            <th>Nb Voiture Vendu</th>
            <th>Chiffre Affaire</th>
            <th>Annee</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={id++}>
              <td>{id++}</td>
              <td>{product.categorie}</td>
              <td>{product.vendus}</td>
              <td>{product.chiffreAffaire}</td>
              <td>{product.annee}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center-test-table">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map(
          (item, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? 'primary' : 'light'}
              onClick={() => paginate(index + 1)}
              className="mx-1-test-table"
            >
              {index + 1}
            </Button>
          )
        )}
      </div>
    </Container>
  );
};

export default StatCategorie;
