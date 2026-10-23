import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const plantsArray = [
  {
    category: "Aromatic Plants",
    plants: [
      { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", description: "Soothing fragrance, ideal for relaxation.", cost: "$15" },
      { name: "Jasmine", image: "https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5?w=300", description: "Sweet scent that blooms in the evening.", cost: "$12" }
    ]
  },
  {
    category: "Medicinal Plants",
    plants: [
      { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", description: "Healing properties for skin and burns.", cost: "$10" },
      { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599598425947-4402a0a29931?w=300", description: "Improves indoor air quality.", cost: "$18" }
    ]
  }
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div className="product-list-container" style={{ padding: '20px' }}>
      <h2>Our Plant Collection</h2>
      {plantsArray.map((categoryObj, index) => (
        <div key={index} className="category-section" style={{ marginBottom: '30px' }}>
          <h3>{categoryObj.category}</h3>
          <div className="plants-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {categoryObj.plants.map((plant, pIndex) => (
              <div key={pIndex} className="plant-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '220px', textAlign: 'center' }}>
                <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '5px' }} />
                <h4>{plant.name}</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>{plant.description}</p>
                <p><strong>{plant.cost}</strong></p>
                <button 
                  onClick={() => handleAddToCart(plant)}
                  disabled={isAddedToCart(plant.name)}
                  style={{ 
                    backgroundColor: isAddedToCart(plant.name) ? '#ccc' : '#2e7d32', 
                    color: 'white', 
                    padding: '8px 16px', 
                    border: 'none', 
                    cursor: isAddedToCart(plant.name) ? 'not-allowed' : 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  {isAddedToCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
