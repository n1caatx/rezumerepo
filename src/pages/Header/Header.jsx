import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; 
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div>
      <header className={styles.header}>
        <ul>
          <li>
            <a href="#">H O M E</a>
            <a href="#">P O R T F O L I O</a>
            <a href="#">R E S U M E</a>
            <a href="#">A B O U T</a>
            <a href="#">C O N T A C T</a>
            <Link to="/cart" className={styles.cartIcon}>
              <FaShoppingCart size={18} />
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
};
