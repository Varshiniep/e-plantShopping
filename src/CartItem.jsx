import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  // Total cost for one plant type (unit price x quantity)
  const calculateTotalCost = (item) => item.cost * item.quantity;

  // Total amount for every plant in the cart
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Quantity would reach 0, so remove the plant from the cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    setShowCheckoutMessage(true);
  };

  return (
    <div className="cart-container">
      <h2 className="total_cart_amount">Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.length === 0 ? (
        <div className="cart-empty">Your cart is empty. Add some plants to get started!</div>
      ) : (
        <div>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit price: ${item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>
                    +
                  </button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>

      {showCheckoutMessage && <div className="checkout-message">Coming Soon</div>}
    </div>
  );
};

export default CartItem;
