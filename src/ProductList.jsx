import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

// Builds a small self-contained SVG thumbnail (so the app works without any image files).
const makeThumbnail = (emoji, bg) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="220" viewBox="0 0 300 220">` +
      `<rect width="300" height="220" fill="${bg}"/>` +
      `<text x="150" y="130" font-size="96" text-anchor="middle">${emoji}</text>` +
      `</svg>`
  );

// 3 categories x 6 unique houseplants each
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: makeThumbnail('🌿', '#d9f2d0'), description: 'Produces oxygen at night, improving air quality.', cost: 15 },
      { name: 'Spider Plant', image: makeThumbnail('🍃', '#e3f5d8'), description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: makeThumbnail('🌼', '#f2f7e0'), description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: makeThumbnail('🌱', '#d4eed9'), description: 'Adds humidity and removes toxins from the air.', cost: 20 },
      { name: 'Rubber Plant', image: makeThumbnail('🪴', '#dff0e4'), description: 'Easy to grow and absorbs airborne chemicals.', cost: 17 },
      { name: 'Aloe Vera', image: makeThumbnail('🌵', '#e6f4d7'), description: 'Purifies the air and soothes burns and cuts.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: makeThumbnail('💜', '#ece3f7'), description: 'Calming scent that promotes relaxation and sleep.', cost: 20 },
      { name: 'Jasmine', image: makeThumbnail('🤍', '#f7f3ea'), description: 'Sweet fragrance that lifts your mood.', cost: 18 },
      { name: 'Rosemary', image: makeThumbnail('🌾', '#dcebd0'), description: 'Fragrant herb used in cooking and aromatherapy.', cost: 15 },
      { name: 'Mint', image: makeThumbnail('🍀', '#d3f0dc'), description: 'Refreshing scent that repels pests.', cost: 12 },
      { name: 'Lemon Balm', image: makeThumbnail('🍋', '#f5f3cf'), description: 'Citrus aroma that reduces stress and anxiety.', cost: 14 },
      { name: 'Hyacinth', image: makeThumbnail('🌸', '#f8e3ee'), description: 'Strong floral scent that brightens any room.', cost: 22 },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { name: 'Echeveria', image: makeThumbnail('🪷', '#e7f1dd'), description: 'Rosette-shaped succulent that loves sunlight.', cost: 10 },
      { name: 'Jade Plant', image: makeThumbnail('🌳', '#d5ecd7'), description: 'Symbol of good luck; very low maintenance.', cost: 16 },
      { name: 'Zebra Haworthia', image: makeThumbnail('🦓', '#e9efe4'), description: 'Striped, compact succulent for small spaces.', cost: 13 },
      { name: 'Barrel Cactus', image: makeThumbnail('🌵', '#f1ead2'), description: 'Round, spiny cactus that needs little water.', cost: 19 },
      { name: 'Burro\'s Tail', image: makeThumbnail('🪢', '#dcefe0'), description: 'Trailing stems that look great in hanging pots.', cost: 17 },
      { name: 'Panda Plant', image: makeThumbnail('🐼', '#e8eee6'), description: 'Soft, fuzzy leaves with a silvery sheen.', cost: 15 },
    ],
  },
];

// Simple cart icon (SVG)
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="52" width="52" id="IconChangeColor">
    <rect width="156" height="156" fill="none"></rect>
    <circle cx="80" cy="216" r="12"></circle>
    <circle cx="184" cy="216" r="12"></circle>
    <path
      d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
      id="mainIconPathAttribute"
    ></path>
  </svg>
);

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Total number of plants in the cart (shown on the cart icon)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // A plant is "added" if it is currently in the cart (button is then disabled)
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      {/* Navbar: shown on both the Product Listing page and the Cart page */}
      <div className="navbar">
        <div className="brand" onClick={handleHomeClick}>
          <span style={{ fontSize: '2rem' }}>🪴</span>
          <div>
            <h3>Paradise Nursery</h3>
            <small>Where Green Meets Serenity</small>
          </div>
        </div>
        <div className="navbar-links">
          <a href="#home" onClick={handleHomeClick}>Home</a>
          <a href="#plants" onClick={handlePlantsClick}>Plants</a>
          <a href="#cart" onClick={handleCartClick} className="cart-link" aria-label="Cart">
            <CartIcon />
            <span className="cart-count" id="cart_quantity_count">{totalQuantity}</span>
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid-section">
          {plantsArray.map((section) => (
            <div key={section.category}>
              <h2 className="category-title">{section.category}</h2>
              <div className="product-grid">
                {section.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-price">${plant.cost}</div>
                    <p className="product-description">{plant.description}</p>
                    <button
                      className={`product-button ${isInCart(plant.name) ? 'added-to-cart' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
