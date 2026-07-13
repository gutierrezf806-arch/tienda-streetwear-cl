"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "tienda-cart";

function readCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — ignore
  }
}

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(readCart());
  }, []);

  const persist = useCallback((items) => {
    setCartItems(items);
    writeCart(items);
  }, []);

  const addItem = useCallback(
    (product) => {
      const { id, name, price, size, color, quantity = 1 } = product;

      setCartItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.id === id && item.size === size && item.color === color
        );

        let next;
        if (existingIndex !== -1) {
          next = prev.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          next = [...prev, { id, name, price, quantity, size, color }];
        }

        writeCart(next);
        return next;
      });
    },
    []
  );

  const removeItem = useCallback((productId) => {
    setCartItems((prev) => {
      const next = prev.filter((item) => item.id !== productId);
      writeCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCartItems((prev) => {
      const next = prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      writeCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    persist([]);
  }, [persist]);

  const getCartTotal = useCallback(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const getCartCount = useCallback(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  );

  return {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    getCartTotal,
    getCartCount,
    clearCart,
  };
}
