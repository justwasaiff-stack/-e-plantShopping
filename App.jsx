import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');
  
  const cartItems = useSelector(state => state.cart.items);
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleGetStartedClick = () => {
    setShowProductList(true);
    setCurrentPage('products');
  };

  return (
    <div className="app">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Welcome To Paradise Nursery</h1>
            <p>Where Green Meets Serenity. Discover our exquisite collection of house plants for your home and office.</p>
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
            <div style={{ marginTop: '30px' }}>
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <nav className="navbar">
            <div className="navbar-brand" onClick={() => setCurrentPage('products')} style={{ cursor: 'pointer' }}>
              <h2>Paradise Nursery</h2>
            </div>
            <div className="navbar-links">
              <button onClick={() => setCurrentPage('products')}>Plants</button>
              <button onClick={() => setCurrentPage('cart')}>
                🛒 Cart ({totalCartCount})
              </button>
            </div>
          </nav>

          {currentPage === 'products' && <ProductList />}
          {currentPage === 'cart' && <CartItem onContinueShopping={() => setCurrentPage('products')} />}
        </div>
      )}
    </div>
  );
}

export default App;
