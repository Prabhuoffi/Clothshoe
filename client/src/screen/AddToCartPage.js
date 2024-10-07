import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (e, itemId) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleDelete = (itemId) => {
    removeFromCart(itemId);
  };

  const handleBuyNow = (item) => {
    navigate('/order-details', { state: { item } });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cartItems.map((item) => (
            <div key={item._id} className="border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col justify-between transition duration-300 ease-in-out transform hover:scale-105">
              <div className="flex justify-center">
                <img src={item.image} alt={item.name} className="w-32 h-32 object-contain mb-4" />
              </div>
              <div className="flex-grow text-center">
                <p className="text-lg text-gray-600 mb-2"><strong>ID:</strong> {item._id}</p>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
                <p className="text-lg text-gray-600 mb-4">₹{item.cost}</p>
              </div>
              <div className="flex flex-col items-center mb-4">
                <label htmlFor={`quantity-${item._id}`} className="mb-2">Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${item._id}`}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, item._id)}
                  className="border border-gray-300 rounded-md p-2 w-20 text-center"
                  min="1"
                />
              </div>
              <div className="flex justify-around">
                <button
                  onClick={() => handleBuyNow(item)}
                  className="bg-purple-500 text-white py-2 px-4 rounded-full font-semibold shadow-md hover:bg-purple-600 transition duration-300 ease-in-out"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-full font-semibold shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
