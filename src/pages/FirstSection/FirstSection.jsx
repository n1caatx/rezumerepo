import React from 'react';
import styles from './FirstSection.module.css';
import { Header } from '../Header/Header';

export const FirstSection = () => {
  return (
    <>
      <Header />

      <div className={styles.imgContainer}>
        <div className={styles.overlay}></div>
        <img 
          src="https://preview.colorlib.com/theme/rezume/images/image_1.jpg" 
          alt="Background" 
          className={styles.image}
        />
        <div className={styles.textContent}>
          <h1>Hello, I'm
            Charles Anderson</h1>
          <p>Discover my work and experience</p>
        </div>
      </div>
    </>
  );
};
