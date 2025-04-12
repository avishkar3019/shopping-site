import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculate the total price dynamically based on item quantities
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    clearCart(); // Clear the cart
    setOrderPlaced(true); // Show the confirmation message
  };

  useEffect(() => {
    if (orderPlaced) {
      const timer = setTimeout(() => {
        setOrderPlaced(false); // Hide the confirmation message after 4 seconds
      }, 4000);

      return () => clearTimeout(timer); // Cleanup
    }
  }, [orderPlaced]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                borderBottom: '1px solid #ccc',
                paddingBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={item.image} alt={item.title} height="60" />
                  <div>
                    <h4>{item.title.slice(0, 40)}...</h4>
                    <p><strong>₹ {item.price}</strong> (x{item.quantity})</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: '6px 12px',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h3>Total: ₹ {total}</h3>

          <button
            onClick={handleCheckout}
            style={{
              padding: '10px 20px',
              background: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Checkout
          </button>
        </div>
      )}

      {/* Order Confirmation Message */}
      {orderPlaced && (
        <div style={{
          marginTop: '1rem',
          padding: '10px',
          background: 'lightgreen',
          color: 'green',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <p>Order placed successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
