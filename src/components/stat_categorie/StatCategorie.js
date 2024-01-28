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

  // Simuler des données de produits
  useEffect(() => {
    // Remplacez cela par la logique pour récupérer les produits depuis votre API
    const fakeProducts = [
      { id: 1, name: 'Cat 1', nb_vendu: 10, prix_commission: 19.99, annee: '2020'},
      { id: 2, name: 'Cat 2', nb_vendu: 10, prix_commission: 19.99, annee: '2021'},
      { id: 3, name: 'Cat 3', nb_vendu: 10, prix_commission: 19.99, annee: '2021'},
      { id: 4, name: 'Cat 4', nb_vendu: 10, prix_commission: 19.99, annee: '2022'},
      { id: 5, name: 'Cat 5', nb_vendu: 10, prix_commission: 19.99, annee: '2023'},
      { id: 6, name: 'Cat 6', nb_vendu: 10, prix_commission: 19.99, annee: '2024'},
      { id: 7, name: 'Cat 7', nb_vendu: 10, prix_commission: 19.99, annee: '2024'},
      { id: 8, name: 'Cat 8', nb_vendu: 10, prix_commission: 19.99, annee: '2024'},
      { id: 9, name: 'Cat 9', nb_vendu: 10, prix_commission: 19.99, annee: '2020'},
      { id: 10, name: 'Cat 10', nb_vendu: 10, prix_commission: 19.99 , annee: '2022'},
    ];

    setProducts(fakeProducts);
    setFilteredProducts(fakeProducts);
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

  const uniqueYears = Array.from(new Set(products.map((product) => product.annee)));

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
          <option value="name">Annee</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
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
