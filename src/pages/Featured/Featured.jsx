import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice';
import { addToCart } from '../../redux/cartSlice'; 
import styles from './Featured.module.css';

export const Featured = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); 
  };

  return (
    <section className={styles.portfolioSection}>
      <h2 className={styles.title}>
        Featured <span className={styles.highlight}>Portfolio</span>
      </h2>

      <ul className={styles.categories}>
        <li
          className={`${styles.category} ${selectedCategory === 'All' ? styles.active : ''}`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </li>
        <li
          className={`${styles.category} ${selectedCategory === 'Packaging' ? styles.active : ''}`}
          onClick={() => setSelectedCategory('Packaging')}
        >
          Packaging
        </li>
        <li
          className={`${styles.category} ${selectedCategory === 'Mockup' ? styles.active : ''}`}
          onClick={() => setSelectedCategory('Mockup')}
        >
          Mockup
        </li>
        <li
          className={`${styles.category} ${selectedCategory === 'Typography' ? styles.active : ''}`}
          onClick={() => setSelectedCategory('Typography')}
        >
          Typography
        </li>
        <li
          className={`${styles.category} ${selectedCategory === 'Photography' ? styles.active : ''}`}
          onClick={() => setSelectedCategory('Photography')}
        >
          Photography
        </li>
      </ul>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {status === 'succeeded' && (
        <>
          <div className={styles.itemsContainer}>
            {currentProducts.map((product) => (
              <div key={product.id} className={styles.item}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={styles.image}
                />
                <h3 className={styles.itemTitle}>{product.title}</h3>
                <p className={styles.itemCategory}>{product.category.toUpperCase()}</p>

                <button
                  className={styles.addToCartButton}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className={styles.pageNumber}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={styles.paginationButton}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};
