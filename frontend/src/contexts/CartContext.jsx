import React, { createContext, useContext, useState, useEffect } from 'react';
import { useModal } from './ModalContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { showModal } = useModal();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('kitsune_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('kitsune_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    // Memberikan ID unik pada setiap barang custom agar tidak ter-stack
    const newItem = { ...item, cartId: Date.now().toString() };
    setCart((prevCart) => [...prevCart, newItem]);
    
    // Memberikan feedback instan sederhana ke user
    showModal(`Berhasil menambahkan ${item.name} ke keranjang!`, 'success');
  };

  const removeFromCart = (cartId) => {
    setCart((prevCart) => prevCart.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
