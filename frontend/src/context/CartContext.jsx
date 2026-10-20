/**
 * CART CONTEXT — stores shopping cart in memory + localStorage
 *
 * Any component can call useCart() to:
 *   addItem(product)     — add to cart
 *   removeItem(id)       — remove from cart
 *   updateQuantity(id, n)— change quantity
 *   clearCart()          — empty cart after order
 *   items, subtotal, total — read cart data
 */
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Load cart from browser storage on first load
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  const [coupon, setCoupon] = useState(null);

  // Save cart to browser whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  function addItem(product, quantity = 1) {
    setItems((prevItems) => {
      // Check if product already in cart
      const existing = prevItems.find((i) => i.product.id === product.id);

      if (existing) {
        // Increase quantity
        return prevItems.map((i) => {
          if (i.product.id === product.id) {
            return { product: i.product, quantity: i.quantity + quantity };
          }
          return i;
        });
      }

      // Add new item
      return [...prevItems, { product, quantity }];
    });
  }

  function removeItem(productId) {
    setItems((prevItems) => prevItems.filter((i) => i.product.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((i) => {
        if (i.product.id === productId) {
          return { product: i.product, quantity };
        }
        return i;
      })
    );
  }

  function clearCart() {
    setItems([]);
    setCoupon(null);
  }

  // Calculate totals
  let subtotal = 0;
  let itemCount = 0;
  for (const i of items) {
    subtotal += i.product.price * i.quantity;
    itemCount += i.quantity;
  }
  const discount = coupon ? coupon.discount : 0;
  const tax = (subtotal - discount) * 0.05;
  const total = subtotal - discount + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        coupon,
        setCoupon,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        tax,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}
