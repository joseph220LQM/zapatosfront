/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Añadir producto
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Quitar producto
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p._id !== id));
  };

  // Aumentar cantidad
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  // Disminuir cantidad
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p
      )
    );
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  // Total del carrito
  const cartTotal = cart.reduce((acc, item) => acc + item.qty * item.precio, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, increaseQty, decreaseQty, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
