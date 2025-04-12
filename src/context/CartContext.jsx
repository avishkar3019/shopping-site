import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { 
                ...item, 
                quantity: item.quantity + 1, 
                price: item.price + product.price 
              }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1, price: product.price }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            const newPrice = (item.price / item.quantity) * newQuantity;
            return { ...item, quantity: newQuantity, price: newPrice };
          } else {
            return null;
          }
        }
        return item;
      }).filter(item => item !== null);
      
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
