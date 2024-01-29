import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

import './StatCategorie.css'; // Import the custom CSS file

const StatCategorie = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('name'); // Initial filter: 'name'
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [categories, setCategories] = useState([]);

  
  const fetchData = async () => {

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://192.168.88.27:8080/modele/categorie', {
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

  };

  useEffect(() => {
    fetchData();
  }, []);


  // Filtrer les produits en fonction du terme de recherche et du filtre sélectionné
  useEffect(() => {
    if(selectedFilter === 'name'){
      console.log('type 1');
      console.log('a rechercher '+searchTerm.toLowerCase());
      const filtered = products.filter((product) =>
        String(product[selectedFilter]).toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }else if(selectedFilter === 'annee'){
        if(searchTerm2 === 'name'){
          console.log('2.1');
          setFilteredProducts(products);
        }else{
          console.log('2.2');
          const filtered = products.filter((product) =>
            String(product[selectedFilter]).includes(searchTerm2)
          );
          setFilteredProducts(filtered);
        }
    }
  }, [searchTerm2, selectedFilter, searchTerm, products]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('http://192.168.88.27:8080/stats/statsCategorie', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({categorie : searchTerm2})
      });

      const data = await response.json();

        if (response.ok) {
          console.log('Successful products fetch by category:', data.object);
          setProducts(data.object);
        } else {
          console.log('Failed products fetch by category:', data);
          console.error('Failed products fetch by category:', response.status, response.statusText);
          // Handle failure or other errors
        }
      } catch (error) {
        console.error('Error during product fetching by category:', error.message);
        // Handle other errors
      }
    };

    // Call the fetchProductsByCategory function when the category changes
    if (searchTerm2) {
      fetchProductsByCategory();
    }
  }, [searchTerm2]);

  // Obtenir les produits actuels par page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Gestion de la modification du produit
  const handleEditProduct = (id) => {
    // Logique de modification, faites ce que vous devez faire avec le produit ayant l'ID donné
    console.log('Modification du produit avec l\'ID', id);
  };

  return (
    <Container className="mt-5-test-table">
      <h1 className="mb-4-test-table">Statistique Vente Par Marque</h1>
      <div className="mb-3-test-table">
        <input
          type="text"
          placeholder="Rechercher une marque..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedFilter('name');
          }}
        />
        <Form.Select
          className="ml-2-test-table"
          onChange={(e) => {
            setSelectedFilter(e.target.value);
            if (e.target.value !== 'name') {
              setSelectedFilter('annee');
              setSearchTerm2(e.target.value);
            }else{
              setSearchTerm2(e.target.value);
            }
          }}
          value={searchTerm2}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
              <option key={category._id} value={`${category.nom}`}>
                    {category.nom}
              </option>
          ))}
        </Form.Select>
      </div>
      <table className="table table-bordered-test-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Marque</th>
            <th>Nb Voiture Vendu</th>
            <th>Prix Commission</th>
            <th>Annee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.nb_vendu}</td>
                <td>{product.prix_commission}</td>
                <td>{product.annee}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEditProduct(product.id)}>
                    Modifier
                  </Button>
                </td>
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
