import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');  // Added state for search query
  const { addToCart } = useCart();

  // Fetch products based on category and search query
  useEffect(() => {
    const url = category === 'all' 
      ? 'https://fakestoreapi.com/products'
      : `https://fakestoreapi.com/products/category/${category}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        // Filter products based on search query
        const filteredData = data.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())  // Case insensitive search
        );
        setProducts(filteredData);
      });
  }, [category, searchQuery]); // Fetch products whenever category or searchQuery changes

  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: '#1e1e1e',
      minHeight: '100vh',
      color: '#fff'
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '1.5rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '1.5rem'
    },
    card: {
      background: '#fff',
      color: '#000',
      borderRadius: '10px',
      padding: '1rem',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    image: {
      height: '200px',
      width: '100%',
      objectFit: 'contain',
      borderRadius: '8px',
      marginBottom: '1rem'
    },
    title: {
      fontSize: '1rem',
      fontWeight: '600',
      margin: '0.5rem 0'
    },
    price: {
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    description: {
      fontSize: '0.85rem',
      color: '#333',
      marginBottom: '1rem'
    },
    button: {
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer'
    },
    searchInput: {
      marginBottom: '1rem',
      padding: '0.5rem',
      fontSize: '1rem',
      width: '100%',
      maxWidth: '400px',
      marginRight: 'auto',
      marginLeft: 'auto',
      display: 'block',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛍️ Products</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}  // Update search query
        style={styles.searchInput}
      />

      {/* Category filter */}
      <select
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        style={{ marginBottom: '1rem', padding: '0.5rem', fontSize: '1rem' }}
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.title} style={styles.image} />
            <h3 style={styles.title}>{product.title.slice(0, 30)}...</h3>
            <p style={styles.price}>₹ {product.price}</p>
            <p style={styles.description}>
              {product.description.slice(0, 60)}...
            </p>
            <button style={styles.button} onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
