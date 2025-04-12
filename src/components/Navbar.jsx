import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); // ensures boolean

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={{
      padding: '1rem',
      background: '#f4f4f4',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      <div>
        <Link to="/" style={{ marginRight: '1rem', textDecoration: 'none' }}>Home</Link>
        <Link to="/products" style={{ marginRight: '1rem', textDecoration: 'none' }}>Products</Link>
      </div>

      <div>
        <Link to="/cart" style={{ position: 'relative', marginRight: '1rem', textDecoration: 'none' }}>
          Cart
          <span style={{
            marginLeft: '6px',
            background: 'red',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '0.8rem'
          }}>
            {totalQuantity}
          </span>
        </Link>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#333',
              fontWeight: 'bold',
              transition: 'color 0.3s',
            }}
            onMouseOver={(e) => e.target.style.color = '#e74c3c'}
            onMouseOut={(e) => e.target.style.color = '#333'}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
