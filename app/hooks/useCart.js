"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "tienda-cart";
const CART_UPDATED_EVENT = "cart-updated";

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
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(readCart());

    const handleCartUpdated = () => setCartItems(readCart());
    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdated);
    return () => window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdated);
  }, []);

  const persist = useCallback((items) => {
    writeCart(items);
    setCartItems(items);
  }, []);

  const addItem = useCallback((product) => {
    const { id, name, price, size, color, quantity = 1 } = product;

    const current = readCart();
    const existingIndex = current.findIndex(
      (item) => item.id === id && item.size === size && item.color === color
    );

    const next =
      existingIndex !== -1
        ? current.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...current, { id, name, price, quantity, size, color }];

    writeCart(next);
    setCartItems(next);
  }, []);

  const removeItem = useCallback((productId, size, color) => {
    const next = readCart().filter(
      (item) => !(item.id === productId && item.size === size && item.color === color)
    );
    writeCart(next);
    setCartItems(next);
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    const next = readCart().map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    writeCart(next);
    setCartItems(next);
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
