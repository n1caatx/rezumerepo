// Cart.js
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Cart.module.css'; 

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  
  return (
    <div className={styles.cartContainer}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.thumbnail} alt={item.title} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <h3>{item.title}</h3>
                <p>Category: {item.category}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
